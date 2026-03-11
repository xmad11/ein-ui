'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, Type, Move, Palette, Maximize2 } from 'lucide-react'
import { PageComponent, ComponentPropValue, ComponentCustomizations } from './types'

interface PropertyPanelProps {
  component: PageComponent | undefined
  onUpdate: (componentId: string, updates: Partial<PageComponent>) => void
  onDelete: (componentId: string) => void
  onClose: () => void
}

export function PropertyPanel({
  component,
  onUpdate,
  onDelete,
  onClose
}: PropertyPanelProps) {
  if (!component) return null

  const handlePropChange = (key: string, value: ComponentPropValue) => {
    onUpdate(component.id, {
      props: { ...component.props, [key]: value }
    })
  }

  const handleStyleChange = (key: keyof ComponentCustomizations, value: string | number) => {
    onUpdate(component.id, {
      customizations: { ...component.customizations, [key]: value }
    })
  }

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    onUpdate(component.id, {
      position: { ...component.position, [axis]: value }
    })
  }

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    onUpdate(component.id, {
      size: { ...component.size, [dimension]: value }
    })
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
        <h3 className="font-semibold capitalize">{component.type} Properties</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-accent rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Content Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Type className="w-4 h-4" />
            Content
          </div>

          {component.type === 'header' && (
            <>
              <div>
                <label className="text-xs text-muted-foreground">Text</label>
                <input
                  type="text"
                  value={component.props.text || ''}
                  onChange={(e) => handlePropChange('text', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Level</label>
                <select
                  value={component.props.level || 1}
                  onChange={(e) => handlePropChange('level', parseInt(e.target.value))}
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>H{n}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {component.type === 'paragraph' && (
            <div>
              <label className="text-xs text-muted-foreground">Text</label>
              <textarea
                value={component.props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md min-h-[100px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}

          {component.type === 'button' && (
            <div>
              <label className="text-xs text-muted-foreground">Button Text</label>
              <input
                type="text"
                value={component.props.text || ''}
                onChange={(e) => handlePropChange('text', e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}

          {component.type === 'image' && (
            <>
              <div>
                <label className="text-xs text-muted-foreground">Image URL</label>
                <input
                  type="text"
                  value={component.props.src || ''}
                  onChange={(e) => handlePropChange('src', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Alt Text</label>
                <input
                  type="text"
                  value={component.props.alt || ''}
                  onChange={(e) => handlePropChange('alt', e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </>
          )}
        </div>

        {/* Position Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Move className="w-4 h-4" />
            Position
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">X</label>
              <input
                type="number"
                value={component.position.x}
                onChange={(e) => handlePositionChange('x', parseInt(e.target.value) || 0)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Y</label>
              <input
                type="number"
                value={component.position.y}
                onChange={(e) => handlePositionChange('y', parseInt(e.target.value) || 0)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Size Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Maximize2 className="w-4 h-4" />
            Size
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Width</label>
              <input
                type="number"
                value={component.size.width}
                onChange={(e) => handleSizeChange('width', parseInt(e.target.value) || 20)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Height</label>
              <input
                type="number"
                value={component.size.height}
                onChange={(e) => handleSizeChange('height', parseInt(e.target.value) || 20)}
                className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>

        {/* Style Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Palette className="w-4 h-4" />
            Style
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Font Size</label>
            <select
              value={component.customizations?.fontSize || 'base'}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="xs">XS</option>
              <option value="sm">SM</option>
              <option value="base">Base</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Font Weight</label>
            <select
              value={component.customizations?.fontWeight || 'normal'}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Text Color</label>
              <input
                type="color"
                value={component.customizations?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="w-full mt-1 h-9 bg-background border border-border rounded-md cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Background</label>
              <input
                type="color"
                value={component.customizations?.backgroundColor || '#ffffff'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="w-full mt-1 h-9 bg-background border border-border rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Border Radius</label>
            <select
              value={component.customizations?.borderRadius || 'md'}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="none">None</option>
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="full">Full</option>
            </select>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(component.id)}
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Delete Component
        </button>
      </div>
    </motion.div>
  )
}

export default PropertyPanel
