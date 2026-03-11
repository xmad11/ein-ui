'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Settings2, Layers, Trash2 } from 'lucide-react'
import { PageComponent, PageConfig } from './types'
import { ComponentLibrary } from './ComponentLibrary'

type TabType = 'add' | 'properties' | 'layers' | 'settings'

interface DesignerPanelProps {
  isOpen: boolean
  selectedComponent: PageComponent | undefined
  pageConfig: PageConfig
  onUpdateComponent: (id: string, updates: Partial<PageComponent>) => void
  onDeleteComponent: (id: string) => void
  onAddComponent: (component: Partial<PageComponent>) => void
  onSelectComponent: (id: string | null) => void
}

export function DesignerPanel({
  isOpen,
  selectedComponent,
  pageConfig,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
  onSelectComponent
}: DesignerPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>(selectedComponent ? 'properties' : 'add')

  // Switch to properties tab when component is selected
  React.useEffect(() => {
    if (selectedComponent) {
      setActiveTab('properties')
    }
  }, [selectedComponent])

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'add', label: 'Add', icon: <Plus className="w-4 h-4" /> },
    { id: 'properties', label: 'Properties', icon: <Settings2 className="w-4 h-4" /> },
    { id: 'layers', label: 'Layers', icon: <Layers className="w-4 h-4" /> }
  ]

  const handlePropChange = (key: string, value: string | number | boolean) => {
    if (selectedComponent) {
      onUpdateComponent(selectedComponent.id, {
        props: { ...selectedComponent.props, [key]: value }
      })
    }
  }

  const handleStyleChange = (key: string, value: string | number) => {
    if (selectedComponent) {
      onUpdateComponent(selectedComponent.id, {
        customizations: { ...selectedComponent.customizations, [key]: value }
      })
    }
  }

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    if (selectedComponent) {
      onUpdateComponent(selectedComponent.id, {
        position: { ...selectedComponent.position, [axis]: value }
      })
    }
  }

  const handleSizeChange = (dimension: 'width' | 'height', value: number) => {
    if (selectedComponent) {
      onUpdateComponent(selectedComponent.id, {
        size: { ...selectedComponent.size, [dimension]: value }
      })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed right-0 top-14 bottom-0 w-80 bg-background border-l border-border shadow-xl z-40 flex flex-col"
        >
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }
                `}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Add Tab */}
            {activeTab === 'add' && (
              <div className="p-4">
                <ComponentLibrary onAddComponent={onAddComponent} />
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div className="p-4">
                {selectedComponent ? (
                  <div className="space-y-6">
                    {/* Component Type Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold capitalize">
                        {selectedComponent.type}
                      </h3>
                      <button
                        onClick={() => onDeleteComponent(selectedComponent.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Content
                      </label>

                      {selectedComponent.type === 'header' && (
                        <>
                          <div>
                            <label className="text-xs text-muted-foreground">Text</label>
                            <input
                              type="text"
                              value={selectedComponent.props.text || ''}
                              onChange={(e) => handlePropChange('text', e.target.value)}
                              className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Level</label>
                            <select
                              value={selectedComponent.props.level || 1}
                              onChange={(e) => handlePropChange('level', parseInt(e.target.value))}
                              className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            >
                              {[1, 2, 3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>H{n}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      {selectedComponent.type === 'paragraph' && (
                        <div>
                          <label className="text-xs text-muted-foreground">Text</label>
                          <textarea
                            value={selectedComponent.props.text || ''}
                            onChange={(e) => handlePropChange('text', e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      )}

                      {selectedComponent.type === 'button' && (
                        <div>
                          <label className="text-xs text-muted-foreground">Button Text</label>
                          <input
                            type="text"
                            value={selectedComponent.props.text || ''}
                            onChange={(e) => handlePropChange('text', e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      )}

                      {selectedComponent.type === 'image' && (
                        <>
                          <div>
                            <label className="text-xs text-muted-foreground">Image URL</label>
                            <input
                              type="text"
                              value={selectedComponent.props.src || ''}
                              onChange={(e) => handlePropChange('src', e.target.value)}
                              className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Alt Text</label>
                            <input
                              type="text"
                              value={selectedComponent.props.alt || ''}
                              onChange={(e) => handlePropChange('alt', e.target.value)}
                              className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Position Section */}
                    <div className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Position
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground">X</label>
                          <input
                            type="number"
                            value={selectedComponent.position.x}
                            onChange={(e) => handlePositionChange('x', parseInt(e.target.value) || 0)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Y</label>
                          <input
                            type="number"
                            value={selectedComponent.position.y}
                            onChange={(e) => handlePositionChange('y', parseInt(e.target.value) || 0)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Size Section */}
                    <div className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Size
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-muted-foreground">Width</label>
                          <input
                            type="number"
                            value={selectedComponent.size.width}
                            onChange={(e) => handleSizeChange('width', parseInt(e.target.value) || 20)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Height</label>
                          <input
                            type="number"
                            value={selectedComponent.size.height}
                            onChange={(e) => handleSizeChange('height', parseInt(e.target.value) || 20)}
                            className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Style Section */}
                    <div className="space-y-3">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Style
                      </label>

                      <div>
                        <label className="text-xs text-muted-foreground">Font Size</label>
                        <select
                          value={selectedComponent.customizations?.fontSize || 'base'}
                          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                          value={selectedComponent.customizations?.fontWeight || 'normal'}
                          onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
                            value={selectedComponent.customizations?.color || '#000000'}
                            onChange={(e) => handleStyleChange('color', e.target.value)}
                            className="w-full mt-1 h-9 bg-muted/50 border border-border rounded-md cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Background</label>
                          <input
                            type="color"
                            value={selectedComponent.customizations?.backgroundColor || '#ffffff'}
                            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                            className="w-full mt-1 h-9 bg-muted/50 border border-border rounded-md cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-muted-foreground">Border Radius</label>
                        <select
                          value={selectedComponent.customizations?.borderRadius || 'md'}
                          onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                          className="w-full mt-1 px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                          <option value="none">None</option>
                          <option value="sm">SM</option>
                          <option value="md">MD</option>
                          <option value="lg">LG</option>
                          <option value="full">Full</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Settings2 className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Select a component to edit its properties
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Layers Tab */}
            {activeTab === 'layers' && (
              <div className="p-4">
                <div className="space-y-1">
                  {pageConfig.layout.components.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No components yet
                    </p>
                  ) : (
                    pageConfig.layout.components.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => onSelectComponent(comp.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors
                          ${selectedComponent?.id === comp.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-accent text-foreground'
                          }
                        `}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded bg-muted text-xs">
                          {comp.type.charAt(0).toUpperCase()}
                        </span>
                        <span className="capitalize">{comp.type}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {comp.props.text?.slice(0, 15) || comp.type}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DesignerPanel
