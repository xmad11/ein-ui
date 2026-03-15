'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { DesignerHeader, ScreenSize } from './DesignerHeader'
import { DesignerPanel } from './DesignerPanel'
import { PageRenderer } from './PageRenderer'
import { useEditMode } from './hooks/useEditMode'
import { usePageConfig } from './hooks/usePageConfig'
import { PageConfig, PageComponent } from './types'

interface PageEditorProps {
  initialPageData?: Partial<PageConfig>
  onSave?: (config: PageConfig) => void
  onAutoSave?: (config: PageConfig) => void
  className?: string
  readOnly?: boolean
}

export function PageEditor({
  initialPageData,
  onSave,
  onAutoSave,
  className = '',
  readOnly = false
}: PageEditorProps) {
  const editModeHook = useEditMode()
  const {
    pageConfig,
    saveConfig,
    canUndo,
    canRedo,
    undo,
    redo,
    addComponent,
    updateComponent,
    deleteComponent,
    commitPendingHistory
  } = usePageConfig(initialPageData, onAutoSave)

  const {
    editMode,
    selectedComponent,
    showSidebar,
    toggleEditMode,
    setSelectedComponent,
    toggleSidebar
  } = editModeHook

  // Screen size state
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop')

  // Theme state (could be connected to next-themes later)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Side menu state
  const [_showSideMenu, setShowSideMenu] = useState(false)

  // Get selected component data
  const selectedComponentData = pageConfig.layout.components.find(c => c.id === selectedComponent)

  // Handle save
  const handleSave = useCallback(async () => {
    const savedConfig = await saveConfig()
    if (onSave && savedConfig) {
      onSave(savedConfig)
    }
  }, [saveConfig, onSave])

  // Handle component selection - only select, component, don't auto-open panel
  const handleComponentSelect = useCallback((componentId: string | null) => {
    setSelectedComponent(componentId)
  }, [setSelectedComponent])

  // Handle component add
  const handleComponentAdd = useCallback((component: Partial<PageComponent>) => {
    addComponent(component)
  }, [addComponent])

  // Handle component delete
  const handleComponentDelete = useCallback((componentId: string) => {
    deleteComponent(componentId)
    setSelectedComponent(null)
  }, [deleteComponent, setSelectedComponent])

  // Handle open property panel - opens panel and switches to properties tab
  const handleOpenPropertyPanel = useCallback((componentId: string) => {
    setSelectedComponent(componentId)
    toggleSidebar(true)
  }, [setSelectedComponent, toggleSidebar])

  // Handle screen size change
  const handleScreenSizeChange = useCallback((size: ScreenSize) => {
    setScreenSize(size)
  }, [])

  // Handle theme toggle
  const handleToggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev)
    // Could integrate with next-themes here
  }, [])

  // Handle side menu toggle
  const handleToggleSideMenu = useCallback(() => {
    setShowSideMenu(prev => !prev)
  }, [])

  // Handle component update with drag optimization
  const handleComponentUpdate = useCallback((componentId: string, updates: Partial<PageComponent>, options?: { isDragUpdate?: boolean }) => {
    updateComponent(componentId, updates, options)
  }, [updateComponent])

  // Lock body scroll when in edit mode to prevent accidental page scrolling
  useEffect(() => {
    if (editMode.isActive) {
      const originalOverflow = document.body.style.overflow
      const originalOverscroll = document.body.style.overscrollBehavior
      const originalTouchAction = document.body.style.touchAction
      const originalPosition = document.body.style.position
      const originalWidth = document.body.style.width
      const scrollY = window.scrollY

      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.body.style.touchAction = 'pan-x pan-y' // Allow pinch-zoom but not pan-scroll
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollY}px`

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.overscrollBehavior = originalOverscroll
        document.body.style.touchAction = originalTouchAction
        document.body.style.position = originalPosition
        document.body.style.width = originalWidth
        document.body.style.top = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [editMode.isActive])

  // Get canvas width based on screen size
  const getCanvasWidth = () => {
    switch (screenSize) {
      case 'mobile':
        return 375
      case 'tablet':
        return 768
      case 'desktop':
      default:
        return '100%'
    }
  }

  return (
    <div
      className={`relative min-h-screen bg-background ${className}`}
      data-page-editor="true"
    >
      {/* Designer Header */}
      {!readOnly && (
        <DesignerHeader
          isEditMode={editMode.isActive}
          onToggleMode={() => toggleEditMode()}
          onSave={handleSave}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          isPanelOpen={showSidebar}
          onTogglePanel={() => toggleSidebar(!showSidebar)}
          screenSize={screenSize}
          onScreenSizeChange={handleScreenSizeChange}
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
          onToggleSideMenu={handleToggleSideMenu}
        />
      )}

      {/* Main Canvas Area */}
      <main className="h-screen overflow-hidden pt-14">
        <div className="flex items-start justify-center h-full overflow-auto p-4">
          {/* Canvas with screen size preview */}
          <div
            className="relative bg-background shadow-lg transition-all duration-300"
            style={{
              width: getCanvasWidth(),
              maxWidth: '100%',
              height: screenSize === 'desktop' ? '100%' : Math.max(667, window.innerHeight - 120),
              borderRadius: screenSize !== 'desktop' ? '24px' : '0',
              border: screenSize !== 'desktop' ? '8px solid #1a1a1a' : 'none'
            }}
          >
            <PageRenderer
              config={pageConfig}
              isEditMode={editMode.isActive}
              selectedComponentId={selectedComponent}
              onComponentSelect={handleComponentSelect}
              onComponentUpdate={handleComponentUpdate}
              onCommitHistory={commitPendingHistory}
              onOpenPropertyPanel={handleOpenPropertyPanel}
              readOnly={readOnly}
            />
          </div>
        </div>
      </main>

      {/* Side Panel */}
      {!readOnly && (
        <DesignerPanel
          isOpen={showSidebar}
          selectedComponent={selectedComponentData}
          pageConfig={pageConfig}
          onUpdateComponent={handleComponentUpdate}
          onDeleteComponent={handleComponentDelete}
          onAddComponent={handleComponentAdd}
          onSelectComponent={handleComponentSelect}
        />
      )}

      {/* Global styles for edit mode */}
      {editMode.isActive && (
        <style jsx global>{`
          [data-page-editor="true"] {
            touch-action: pan-x pan-y;
          }

          [data-page-component="true"]:hover {
            outline: 2px dashed hsl(var(--primary)) !important;
            outline-offset: 2px !important;
          }

          [data-page-component="true"][data-selected="true"] {
            outline: 2px solid hsl(var(--primary)) !important;
            outline-offset: 2px !important;
          }
        `}</style>
      )}
    </div>
  )
}

export default PageEditor
