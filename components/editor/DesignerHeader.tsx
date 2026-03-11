'use client'

import React from 'react'
import { Eye, Edit3, Undo2, Redo2, Save, PanelRightOpen, PanelRightClose, Smartphone, Tablet, Monitor, Moon, Sun, Menu } from 'lucide-react'

export type ScreenSize = 'mobile' | 'tablet' | 'desktop'

interface DesignerHeaderProps {
  isEditMode: boolean
  onToggleMode: () => void
  onSave?: () => void
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  isPanelOpen: boolean
  onTogglePanel: () => void
  // Screen size preview
  screenSize?: ScreenSize
  onScreenSizeChange?: (size: ScreenSize) => void
  // Theme toggle
  isDarkMode?: boolean
  onToggleTheme?: () => void
  // Side menu toggle
  onToggleSideMenu?: () => void
}

export function DesignerHeader({
  isEditMode,
  onToggleMode,
  onSave,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  isPanelOpen,
  onTogglePanel,
  screenSize = 'desktop',
  onScreenSizeChange,
  isDarkMode = false,
  onToggleTheme,
  onToggleSideMenu
}: DesignerHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background/95 backdrop-blur border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Menu & Title */}
        <div className="flex items-center gap-3">
          {onToggleSideMenu && (
            <button
              onClick={onToggleSideMenu}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="h-6 w-px bg-border" />

          <span className="text-sm font-semibold">Designer</span>
        </div>

        {/* Center: Screen Size Preview & Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Screen Size Selector */}
          {onScreenSizeChange && (
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 mr-2">
              <button
                onClick={() => onScreenSizeChange('mobile')}
                className={`p-2 rounded-md transition-all ${
                  screenSize === 'mobile'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Mobile (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScreenSizeChange('tablet')}
                className={`p-2 rounded-md transition-all ${
                  screenSize === 'tablet'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Tablet (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScreenSizeChange('desktop')}
                className={`p-2 rounded-md transition-all ${
                  screenSize === 'desktop'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Desktop (1024px+)"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Single Mode Toggle Button */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
            <button
              onClick={onToggleMode}
              className={`
                flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-medium
                ${isEditMode
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background text-foreground shadow-sm'
                }
              `}
            >
              {isEditMode ? (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Editing</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">View</span>
                </>
              )}
            </button>

            {/* Edit Mode Actions */}
            {isEditMode && (
              <>
                <div className="w-px h-5 bg-border mx-1" />

                {/* Undo */}
                <button
                  onClick={onUndo}
                  disabled={!canUndo}
                  className={`
                    p-1.5 rounded-full transition-colors
                    ${canUndo
                      ? 'text-foreground hover:bg-accent'
                      : 'text-muted-foreground/30 cursor-not-allowed'
                    }
                  `}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>

                {/* Redo */}
                <button
                  onClick={onRedo}
                  disabled={!canRedo}
                  className={`
                    p-1.5 rounded-full transition-colors
                    ${canRedo
                      ? 'text-foreground hover:bg-accent'
                      : 'text-muted-foreground/30 cursor-not-allowed'
                    }
                  `}
                  title="Redo (Ctrl+Shift+Z)"
                >
                  <Redo2 className="w-4 h-4" />
                </button>

                {/* Save */}
                {onSave && (
                  <>
                    <div className="w-px h-5 bg-border mx-1" />
                    <button
                      onClick={onSave}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors text-sm font-medium"
                      title="Save (Ctrl+S)"
                    >
                      <Save className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right: Theme & Panel Toggle */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Panel Toggle */}
          <button
            onClick={onTogglePanel}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors text-sm
              ${isPanelOpen
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }
            `}
            title={isPanelOpen ? 'Close Panel' : 'Open Panel'}
          >
            {isPanelOpen ? (
              <PanelRightClose className="w-5 h-5" />
            ) : (
              <PanelRightOpen className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">
              {isPanelOpen ? 'Close' : 'Panel'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default DesignerHeader
