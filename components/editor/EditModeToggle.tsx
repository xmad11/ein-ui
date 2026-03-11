'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Edit3, Eye, Save, Undo2, Redo2 } from 'lucide-react'

interface EditModeToggleProps {
  isActive: boolean
  onToggle: () => void
  onSave?: () => void
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
}

export function EditModeToggle({
  isActive,
  onToggle,
  onSave,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo
}: EditModeToggleProps) {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-1 bg-card border border-border rounded-full shadow-lg p-1">
        {/* View Mode Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => !isActive && onToggle()}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-colors
            ${!isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }
          `}
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">View</span>
        </motion.button>

        {/* Edit Mode Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => !isActive && onToggle()}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full transition-colors
            ${isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }
          `}
        >
          <Edit3 className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </motion.button>

        {/* Divider */}
        {isActive && (
          <>
            <div className="w-px h-6 bg-border mx-1" />

            {/* Undo */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onUndo}
              disabled={!canUndo}
              className={`
                p-2 rounded-full transition-colors
                ${canUndo
                  ? 'text-foreground hover:bg-accent'
                  : 'text-muted-foreground/50 cursor-not-allowed'
                }
              `}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </motion.button>

            {/* Redo */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRedo}
              disabled={!canRedo}
              className={`
                p-2 rounded-full transition-colors
                ${canRedo
                  ? 'text-foreground hover:bg-accent'
                  : 'text-muted-foreground/50 cursor-not-allowed'
                }
              `}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </motion.button>

            {/* Save */}
            {onSave && (
              <>
                <div className="w-px h-6 bg-border mx-1" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onSave}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                  title="Save (Ctrl+S)"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">Save</span>
                </motion.button>
              </>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default EditModeToggle
