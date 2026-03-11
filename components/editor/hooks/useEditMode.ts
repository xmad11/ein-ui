'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { PageComponent } from '../types'

export interface EditModeState {
  isActive: boolean
  isDragging: boolean
  isResizing: boolean
}

export interface ShortcutCallbackData {
  direction?: 'left' | 'right' | 'up' | 'down'
  amount?: number
}

interface ShortcutHandler {
  key: string
  callback: (data?: ShortcutCallbackData) => void
}

export function useEditMode() {
  const [editMode, setEditMode] = useState<EditModeState>({
    isActive: false,
    isDragging: false,
    isResizing: false
  })
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeSidebarTab, setActiveSidebarTab] = useState<'page' | 'properties' | 'add-new'>('properties')
  const [clipboardComponent, setClipboardComponent] = useState<PageComponent | null>(null)
  const [shortcutHandlers, setShortcutHandlers] = useState<Map<string, ShortcutHandler>>(new Map())

  // Track previous active state to avoid stale closure issues
  const prevWasActiveRef = useRef(false)

  const toggleEditMode = useCallback((forceState?: boolean) => {
    setEditMode(prev => {
      const newIsActive = forceState !== undefined ? forceState : !prev.isActive

      // Close panel and deselect when exiting edit mode
      if (!newIsActive && prev.isActive) {
        setSelectedComponent(null)
        setShowSidebar(false)
      }

      return {
        ...prev,
        isActive: newIsActive
      }
    })
  }, [])

  const setDragging = useCallback((isDragging: boolean) => {
    setEditMode(prev => ({ ...prev, isDragging }))
  }, [])

  const setResizing = useCallback((isResizing: boolean) => {
    setEditMode(prev => ({ ...prev, isResizing }))
  }, [])

  const toggleSidebar = useCallback((show?: boolean) => {
    setShowSidebar(show !== undefined ? show : prev => !prev)
  }, [])

  const copyComponent = useCallback((component: PageComponent) => {
    setClipboardComponent(component)
  }, [])

  const registerShortcutHandler = useCallback((key: string, callback: (data?: ShortcutCallbackData) => void) => {
    setShortcutHandlers(prev => new Map(prev).set(key, { key, callback }))
  }, [])

  // Update ref when editMode changes
  useEffect(() => {
    prevWasActiveRef.current = editMode.isActive
  }, [editMode.isActive])

  // Keyboard shortcuts
  useEffect(() => {
    if (!editMode.isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return

      const isMeta = e.metaKey || e.ctrlKey
      const isShift = e.shiftKey

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const handler = shortcutHandlers.get('delete')
        if (handler && selectedComponent) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Escape - deselect
      if (e.key === 'Escape') {
        const handler = shortcutHandlers.get('deselect')
        if (handler) handler.callback()
      }

      // Ctrl/Cmd + Z - Undo
      if (isMeta && e.key === 'z' && !isShift) {
        const handler = shortcutHandlers.get('undo')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Ctrl/Cmd + Shift + Z - Redo
      if (isMeta && e.key === 'z' && isShift) {
        const handler = shortcutHandlers.get('redo')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Ctrl/Cmd + S - Save
      if (isMeta && e.key === 's') {
        const handler = shortcutHandlers.get('save')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Ctrl/Cmd + C - Copy
      if (isMeta && e.key === 'c' && selectedComponent) {
        const handler = shortcutHandlers.get('copy')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Ctrl/Cmd + V - Paste
      if (isMeta && e.key === 'v') {
        const handler = shortcutHandlers.get('paste')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Ctrl/Cmd + D - Duplicate
      if (isMeta && e.key === 'd' && selectedComponent) {
        const handler = shortcutHandlers.get('duplicate')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }

      // Arrow keys - Move component
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        const handler = shortcutHandlers.get('move')
        if (handler && selectedComponent) {
          e.preventDefault()
          const direction = e.key.replace('Arrow', '').toLowerCase() as 'left' | 'right' | 'up' | 'down'
          const amount = isShift ? 10 : 1
          handler.callback({ direction, amount })
        }
      }

      // ? - Show shortcuts help
      if (e.key === '?') {
        const handler = shortcutHandlers.get('help')
        if (handler) {
          e.preventDefault()
          handler.callback()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editMode.isActive, selectedComponent, shortcutHandlers])

  return {
    editMode,
    selectedComponent,
    showSidebar,
    activeSidebarTab,
    clipboardComponent,
    toggleEditMode,
    setDragging,
    setResizing,
    setSelectedComponent,
    toggleSidebar,
    setActiveSidebarTab,
    copyComponent,
    registerShortcutHandler
  }
}

export default useEditMode
