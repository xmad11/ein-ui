'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageConfig, PageComponent, ResizeHandle } from './types'
import { Move, Settings } from 'lucide-react'

// Hook to lock body scroll during drag
function useLockBodyScroll(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const originalOverflow = document.body.style.overflow
      const originalOverscroll = document.body.style.overscrollBehavior
      const originalTouchAction = document.body.style.touchAction
      const originalPosition = document.body.style.position
      const originalWidth = document.body.style.width

      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'none'
      document.body.style.touchAction = 'none'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'

      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.overscrollBehavior = originalOverscroll
        document.body.style.touchAction = originalTouchAction
        document.body.style.position = originalPosition
        document.body.style.width = originalWidth
      }
    }
  }, [isLocked])
}

interface PageRendererProps {
  config: PageConfig
  isEditMode?: boolean
  selectedComponentId?: string | null
  onComponentSelect?: (componentId: string | null) => void
  onComponentUpdate?: (componentId: string, updates: Partial<PageComponent>, options?: { isDragUpdate?: boolean }) => void
  onCommitHistory?: () => void
  onOpenPropertyPanel?: (componentId: string) => void
  readOnly?: boolean
}

// Resize handles configuration
const RESIZE_HANDLES: { position: ResizeHandle; cursor: string }[] = [
  { position: 'top-left', cursor: 'nwse-resize' },
  { position: 'top-right', cursor: 'nesw-resize' },
  { position: 'bottom-left', cursor: 'nesw-resize' },
  { position: 'bottom-right', cursor: 'nwse-resize' },
  { position: 'top', cursor: 'ns-resize' },
  { position: 'bottom', cursor: 'ns-resize' },
  { position: 'left', cursor: 'ew-resize' },
  { position: 'right', cursor: 'ew-resize' },
]

export function PageRenderer({
  config,
  isEditMode = false,
  selectedComponentId,
  onComponentSelect,
  onComponentUpdate,
  onCommitHistory,
  onOpenPropertyPanel,
  readOnly = false
}: PageRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    componentId: string
    startX: number
    startY: number
    offsetX: number
    offsetY: number
  } | null>(null)

  const [resizeState, setResizeState] = useState<{
    isResizing: boolean
    componentId: string
    handle: ResizeHandle
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    startPosX: number
    startPosY: number
  } | null>(null)

  // Lock body scroll during drag/resize
  const isInteracting = !!(dragState || resizeState)
  useLockBodyScroll(isInteracting)

  // Handle mouse move for drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left - dragState.offsetX
    const y = e.clientY - containerRect.top - dragState.offsetY

    // Snap to grid if enabled
    const gridSize = config.settings.snapToGrid ? config.settings.gridSize : 1
    const snappedX = Math.round(x / gridSize) * gridSize
    const snappedY = Math.round(y / gridSize) * gridSize

    onComponentUpdate?.(dragState.componentId, {
      position: { x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
    }, { isDragUpdate: true })
  }, [dragState, config.settings, onComponentUpdate])

  // Handle mouse move for resize
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizeState) return

    const deltaX = e.clientX - resizeState.startX
    const deltaY = e.clientY - resizeState.startY

    let newWidth = resizeState.startWidth
    let newHeight = resizeState.startHeight
    let newX = resizeState.startPosX
    let newY = resizeState.startPosY

    const minSize = 20

    switch (resizeState.handle) {
      case 'right':
        newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
        break
      case 'left':
        newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
        if (newWidth > minSize) newX = resizeState.startPosX + deltaX
        break
      case 'bottom':
        newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
        break
      case 'top':
        newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
        if (newHeight > minSize) newY = resizeState.startPosY + deltaY
        break
      case 'bottom-right':
        newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
        newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
        break
      case 'bottom-left':
        newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
        newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
        if (newWidth > minSize) newX = resizeState.startPosX + deltaX
        break
      case 'top-right':
        newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
        newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
        if (newHeight > minSize) newY = resizeState.startPosY + deltaY
        break
      case 'top-left':
        newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
        newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
        if (newWidth > minSize) newX = resizeState.startPosX + deltaX
        if (newHeight > minSize) newY = resizeState.startPosY + deltaY
        break
    }

    onComponentUpdate?.(resizeState.componentId, {
      size: { width: newWidth, height: newHeight },
      position: { x: newX, y: newY }
    }, { isDragUpdate: true })
  }, [resizeState, onComponentUpdate])

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    // Commit pending history entry before clearing state
    if (dragState || resizeState) {
      onCommitHistory?.()
    }
    setDragState(null)
    setResizeState(null)
  }, [dragState, resizeState, onCommitHistory])

  // Handle touch move for mobile drag and resize
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault()

    const touch = e.touches[0]

    // Handle drag
    if (dragState && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const x = touch.clientX - containerRect.left - dragState.offsetX
      const y = touch.clientY - containerRect.top - dragState.offsetY

      // Snap to grid if enabled
      const gridSize = config.settings.snapToGrid ? config.settings.gridSize : 1
      const snappedX = Math.round(x / gridSize) * gridSize
      const snappedY = Math.round(y / gridSize) * gridSize

      onComponentUpdate?.(dragState.componentId, {
        position: { x: Math.max(0, snappedX), y: Math.max(0, snappedY) }
      }, { isDragUpdate: true })
      return
    }

    // Handle resize
    if (resizeState) {
      const deltaX = touch.clientX - resizeState.startX
      const deltaY = touch.clientY - resizeState.startY

      let newWidth = resizeState.startWidth
      let newHeight = resizeState.startHeight
      let newX = resizeState.startPosX
      let newY = resizeState.startPosY

      const minSize = 20

      switch (resizeState.handle) {
        case 'right':
          newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
          break
        case 'left':
          newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
          if (newWidth > minSize) newX = resizeState.startPosX + deltaX
          break
        case 'bottom':
          newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
          break
        case 'top':
          newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
          if (newHeight > minSize) newY = resizeState.startPosY + deltaY
          break
        case 'bottom-right':
          newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
          newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
          break
        case 'bottom-left':
          newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
          newHeight = Math.max(minSize, resizeState.startHeight + deltaY)
          if (newWidth > minSize) newX = resizeState.startPosX + deltaX
          break
        case 'top-right':
          newWidth = Math.max(minSize, resizeState.startWidth + deltaX)
          newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
          if (newHeight > minSize) newY = resizeState.startPosY + deltaY
          break
        case 'top-left':
          newWidth = Math.max(minSize, resizeState.startWidth - deltaX)
          newHeight = Math.max(minSize, resizeState.startHeight - deltaY)
          if (newWidth > minSize) newX = resizeState.startPosX + deltaX
          if (newHeight > minSize) newY = resizeState.startPosY + deltaY
          break
      }

      onComponentUpdate?.(resizeState.componentId, {
        size: { width: newWidth, height: newHeight },
        position: { x: newX, y: newY }
      }, { isDragUpdate: true })
    }
  }, [dragState, resizeState, config.settings, onComponentUpdate])

  // Add event listeners for mouse and touch
  useEffect(() => {
    if (dragState || resizeState) {
      window.addEventListener('mousemove', dragState ? handleMouseMove : handleResizeMove)
      window.addEventListener('mouseup', handleMouseUp)
      // Touch events for mobile
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', dragState ? handleMouseMove : handleResizeMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [dragState, resizeState, handleMouseMove, handleResizeMove, handleMouseUp, handleTouchMove])

  // Start drag
  const startDrag = useCallback((e: React.MouseEvent, component: PageComponent) => {
    if (!isEditMode || component.locked) return
    e.stopPropagation()
    e.preventDefault()

    const target = e.target as HTMLElement
    const componentEl = target.closest('[data-component-id]') as HTMLElement
    if (!componentEl) return

    const rect = componentEl.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    setDragState({
      isDragging: true,
      componentId: component.id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX,
      offsetY
    })
  }, [isEditMode])

  // Start drag from touch
  const startDragTouch = useCallback((e: React.TouchEvent, component: PageComponent) => {
    if (!isEditMode || component.locked) return
    e.stopPropagation()
    e.preventDefault()

    const touch = e.touches[0]
    const target = e.target as HTMLElement
    const componentEl = target.closest('[data-component-id]') as HTMLElement
    if (!componentEl) return

    const rect = componentEl.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top

    setDragState({
      isDragging: true,
      componentId: component.id,
      startX: touch.clientX,
      startY: touch.clientY,
      offsetX,
      offsetY
    })
  }, [isEditMode])

  // Start resize
  const startResize = useCallback((e: React.MouseEvent, componentId: string, handle: ResizeHandle, component: PageComponent) => {
    if (!isEditMode || component.locked) return
    e.stopPropagation()
    e.preventDefault()

    setResizeState({
      isResizing: true,
      componentId,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: component.size.width,
      startHeight: component.size.height,
      startPosX: component.position.x,
      startPosY: component.position.y
    })
  }, [isEditMode])

  // Start resize from touch
  const startResizeTouch = useCallback((e: React.TouchEvent, componentId: string, handle: ResizeHandle, component: PageComponent) => {
    if (!isEditMode || component.locked) return
    e.stopPropagation()
    e.preventDefault()

    const touch = e.touches[0]
    setResizeState({
      isResizing: true,
      componentId,
      handle,
      startX: touch.clientX,
      startY: touch.clientY,
      startWidth: component.size.width,
      startHeight: component.size.height,
      startPosX: component.position.x,
      startPosY: component.position.y
    })
  }, [isEditMode])

  // Render individual component
  const renderComponent = (component: PageComponent) => {
    const isSelected = selectedComponentId === component.id
    const { position, size, props, customizations, type } = component

    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: size.width,
      height: size.height,
      cursor: isEditMode ? (dragState?.isDragging ? 'grabbing' : 'grab') : 'default',
      ...customizations
    }

    const renderContent = () => {
      switch (type) {
        case 'header':
          const HeadingTag = `h${props.level || 1}` as keyof React.JSX.IntrinsicElements
          return <HeadingTag style={{ margin: 0, width: '100%', height: '100%' }}>{props.text || 'Header'}</HeadingTag>
        case 'paragraph':
          return <p style={{ margin: 0, width: '100%', height: '100%', overflow: 'hidden' }}>{props.text || 'Paragraph text'}</p>
        case 'button':
          return (
            <button
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: customizations?.backgroundColor || 'hsl(var(--primary))',
                color: customizations?.color || 'hsl(var(--primary-foreground))',
                borderRadius: customizations?.borderRadius || '0.5rem'
              }}
            >
              {props.text || 'Button'}
            </button>
          )
        case 'image':
          return (
            <img
              src={props.src || '/placeholder.png'}
              alt={props.alt || 'Image'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )
        case 'container':
          return (
            <div style={{ width: '100%', height: '100%', border: '1px dashed hsl(var(--border))' }}>
              {props.text || 'Container'}
            </div>
          )
        case 'text':
          return <span style={{ width: '100%', height: '100%' }}>{props.text || 'Text'}</span>
        case 'divider':
          return <hr style={{ width: '100%', border: 'none', borderTop: '1px solid hsl(var(--border))' }} />
        case 'spacer':
          return null
        default:
          return <div style={{ width: '100%', height: '100%' }}>{props.text || type}</div>
      }
    }

    return (
      <div
        key={component.id}
        data-component-id={component.id}
        data-page-component="true"
        data-selected={isSelected}
        style={baseStyle}
        onClick={(e) => {
          if (isEditMode && !dragState && !resizeState) {
            e.stopPropagation()
            onComponentSelect?.(component.id)
          }
        }}
        onMouseDown={(e) => {
          // Only select on mouse down, don't start drag
          // Drag is only started from the move handle
          if (isEditMode && !dragState && !resizeState) {
            e.stopPropagation()
            onComponentSelect?.(component.id)
          }
        }}
        onTouchStart={(e) => {
          // Only select on touch start, don't start drag
          // Drag is only started from the move handle
          if (isEditMode && !dragState && !resizeState) {
            e.stopPropagation()
            onComponentSelect?.(component.id)
          }
        }}
        className={`transition-shadow ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
      >
        {renderContent()}

        {/* Edit mode overlay */}
        <AnimatePresence>
          {isEditMode && isSelected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Move handle */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-auto"
                onMouseDown={(e) => startDrag(e, component)}
                onTouchStart={(e) => startDragTouch(e, component)}
              >
                <div className="bg-primary text-primary-foreground p-1 rounded cursor-grab">
                  <Move className="w-4 h-4" />
                </div>
              </div>

              {/* Properties button - opens property panel */}
              {onOpenPropertyPanel && (
                <div
                  className="absolute -top-8 right-0 pointer-events-auto"
                  onClick={() => onOpenPropertyPanel(component.id)}
                >
                  <div className="bg-blue-500 text-white p-1 rounded cursor-pointer hover:bg-blue-600">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Resize handles */}
              {RESIZE_HANDLES.map(({ position, cursor }) => (
                <div
                  key={position}
                  className="absolute w-3 h-3 bg-white border-2 border-primary pointer-events-auto"
                  style={{
                    ...getHandlePosition(position),
                    cursor,
                    borderRadius: '2px'
                  }}
                  onMouseDown={(e) => startResize(e, component.id, position, component)}
                  onTouchStart={(e) => startResizeTouch(e, component.id, position, component)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-background overflow-auto"
      style={{
        touchAction: isEditMode ? 'pan-x pan-y' : 'auto',
        overscrollBehavior: 'contain'
      }}
      onClick={() => isEditMode && onComponentSelect?.(null)}
    >
      {/* Grid */}
      {isEditMode && config.settings.showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: `${config.settings.gridSize}px ${config.settings.gridSize}px`
          }}
        />
      )}

      {/* Components */}
      {config.layout.components.map(renderComponent)}
    </div>
  )
}

// Helper to position resize handles
function getHandlePosition(position: ResizeHandle): React.CSSProperties {
  switch (position) {
    case 'top-left':
      return { top: -6, left: -6 }
    case 'top-right':
      return { top: -6, right: -6 }
    case 'bottom-left':
      return { bottom: -6, left: -6 }
    case 'bottom-right':
      return { bottom: -6, right: -6 }
    case 'top':
      return { top: -6, left: '50%', transform: 'translateX(-50%)' }
    case 'bottom':
      return { bottom: -6, left: '50%', transform: 'translateX(-50%)' }
    case 'left':
      return { left: -6, top: '50%', transform: 'translateY(-50%)' }
    case 'right':
      return { right: -6, top: '50%', transform: 'translateY(-50%)' }
  }
}

export default PageRenderer
