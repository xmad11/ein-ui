'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { PageConfig, PageComponent } from '../types'

interface HistoryEntry {
  config: PageConfig
  timestamp: number
}

// Static date for SSR compatibility
const STATIC_DATE = '2024-01-01T00:00:00.000Z'

// Maximum history entries to prevent memory issues
const MAX_HISTORY_SIZE = 50

const DEFAULT_CONFIG: PageConfig = {
  layout: {
    components: [],
    metadata: {
      lastModified: STATIC_DATE,
      modifiedBy: 'user',
      version: 1
    }
  },
  theme: {
    colorScheme: 'default',
    spacing: 'normal',
    borderRadius: 'md',
    typography: 'inter',
    animations: true
  },
  settings: {
    showGrid: true,
    snapToGrid: true,
    gridSize: 20,
    showRulers: false
  }
}

export function usePageConfig(
  initialData?: Partial<PageConfig>,
  onAutoSave?: (config: PageConfig) => void
) {
  const [pageConfig, setPageConfig] = useState<PageConfig>(() => ({
    ...DEFAULT_CONFIG,
    ...initialData,
    layout: {
      ...DEFAULT_CONFIG.layout,
      ...initialData?.layout
    },
    theme: {
      ...DEFAULT_CONFIG.theme,
      ...initialData?.theme
    },
    settings: {
      ...DEFAULT_CONFIG.settings,
      ...initialData?.settings
    }
  }))

  // Track undo/redo state with state to avoid ref access during render
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  // Use refs for history management
  const historyRef = useRef<HistoryEntry[]>([])
  const historyIndexRef = useRef(-1)
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track pending history entry for debounced saves during drag
  const pendingHistoryRef = useRef<{ config: PageConfig; timestamp: number } | null>(null)
  const historyDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Initialize history on mount (not during render)
  useEffect(() => {
    if (historyIndexRef.current === -1) {
      historyRef.current = [{ config: pageConfig, timestamp: 0 }]
      historyIndexRef.current = 0
    }
  }, [pageConfig])

  const updateHistoryState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0)
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1)
  }, [])

  // Commit pending history entry (called on drag/resize end)
  const commitHistory = useCallback(() => {
    if (pendingHistoryRef.current) {
      const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1)
      newHistory.push(pendingHistoryRef.current)

      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift()
      } else {
        historyIndexRef.current = newHistory.length - 1
      }

      historyRef.current = newHistory
      if (newHistory.length <= MAX_HISTORY_SIZE) {
        historyIndexRef.current = newHistory.length - 1
      }
      pendingHistoryRef.current = null

      // Update undo/redo state
      updateHistoryState()
    }
  }, [updateHistoryState])

  const updatePageConfig = useCallback((
    updater: (config: PageConfig) => PageConfig,
    options?: { skipHistory?: boolean; isDragUpdate?: boolean }
  ) => {
    const { skipHistory = false, isDragUpdate = false } = options || {}

    setPageConfig(prev => {
      const newConfig = updater(prev)

      // Add to history (only on client side) - with debouncing for drag operations
      if (typeof window !== 'undefined' && !skipHistory) {
        if (isDragUpdate) {
          // During drag: just store pending entry, don't add to history yet
          pendingHistoryRef.current = { config: newConfig, timestamp: Date.now() }

          // Clear any existing debounce timer
          if (historyDebounceRef.current) {
            clearTimeout(historyDebounceRef.current)
          }

          // Auto-commit after 500ms of no updates (in case mouseup is missed)
          historyDebounceRef.current = setTimeout(() => {
            commitHistory()
          }, 500)
        } else {
          // Normal update: add to history immediately
          // Clear any pending history first
          if (historyDebounceRef.current) {
            clearTimeout(historyDebounceRef.current)
          }

          const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1)
          newHistory.push({ config: newConfig, timestamp: Date.now() })

          // Limit history size
          if (newHistory.length > MAX_HISTORY_SIZE) {
            newHistory.shift()
          } else {
            historyIndexRef.current = newHistory.length - 1
          }

          historyRef.current = newHistory
          if (newHistory.length <= MAX_HISTORY_SIZE) {
            historyIndexRef.current = newHistory.length - 1
          }

          // Update undo/redo state immediately
          setTimeout(updateHistoryState, 0)
        }
      }

      // Auto-save with debounce
      if (onAutoSave) {
        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current)
        }
        autoSaveTimerRef.current = setTimeout(() => {
          onAutoSave(newConfig)
        }, 1000)
      }

      return newConfig
    })
  }, [onAutoSave, updateHistoryState, commitHistory])

  const saveConfig = useCallback(async (): Promise<PageConfig | null> => {
    try {
      const configToSave: PageConfig = {
        ...pageConfig,
        layout: {
          ...pageConfig.layout,
          metadata: {
            lastModified: typeof window !== 'undefined' ? new Date().toISOString() : STATIC_DATE,
            modifiedBy: pageConfig.layout.metadata?.modifiedBy || 'user',
            version: pageConfig.layout.metadata?.version || 1
          }
        }
      }
      console.log('Saving config:', configToSave)
      return configToSave
    } catch (error) {
      console.error('Save error:', error)
      return null
    }
  }, [pageConfig])

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--
      setPageConfig(historyRef.current[historyIndexRef.current].config)
      updateHistoryState()
    }
  }, [updateHistoryState])

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++
      setPageConfig(historyRef.current[historyIndexRef.current].config)
      updateHistoryState()
    }
  }, [updateHistoryState])

  const addComponent = useCallback((component: Partial<PageComponent>) => {
    const timestamp = typeof window !== 'undefined' ? Date.now() : 0
    const newComponent: PageComponent = {
      id: `component-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      type: component.type || 'text',
      position: component.position || { x: 20, y: 20 },
      size: component.size || { width: 200, height: 50 },
      props: component.props || {},
      customizations: component.customizations || {}
    }

    updatePageConfig(config => ({
      ...config,
      layout: {
        ...config.layout,
        components: [...config.layout.components, newComponent]
      }
    }))

    return newComponent.id
  }, [updatePageConfig])

  const updateComponent = useCallback((componentId: string, updates: Partial<PageComponent>, options?: { skipHistory?: boolean; isDragUpdate?: boolean }) => {
    updatePageConfig(config => ({
      ...config,
      layout: {
        ...config.layout,
        components: config.layout.components.map(comp =>
          comp.id === componentId ? { ...comp, ...updates } : comp
        )
      }
    }), options)
  }, [updatePageConfig])

  const deleteComponent = useCallback((componentId: string) => {
    updatePageConfig(config => ({
      ...config,
      layout: {
        ...config.layout,
        components: config.layout.components.filter(comp => comp.id !== componentId)
      }
    }))
  }, [updatePageConfig])

  const duplicateComponent = useCallback((componentId: string) => {
    const component = pageConfig.layout.components.find(c => c.id === componentId)
    if (component) {
      addComponent({
        ...component,
        position: {
          x: component.position.x + 20,
          y: component.position.y + 20
        }
      })
    }
  }, [pageConfig.layout.components, addComponent])

  // Commit pending history (call this on drag/resize end)
  const commitPendingHistory = useCallback(() => {
    commitHistory()
  }, [commitHistory])

  return {
    pageConfig,
    updatePageConfig,
    saveConfig,
    canUndo,
    canRedo,
    undo,
    redo,
    addComponent,
    updateComponent,
    deleteComponent,
    duplicateComponent,
    commitPendingHistory
  }
}

export default usePageConfig
