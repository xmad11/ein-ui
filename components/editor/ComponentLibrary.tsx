'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Type,
  Heading,
  Square,
  Image,
  Minus,
  Space,
  Box,
  Sparkles,
  ToggleLeft,
  CheckSquare,
  SlidersHorizontal,
  ScrollText,
  CircleDot,
  ChevronRight,
  Gauge,
  CircleUser,
  Loader2
} from 'lucide-react'
import { PageComponent, ComponentDefinition } from './types'

interface ComponentLibraryProps {
  onAddComponent: (component: Partial<PageComponent>) => void
}

// Basic components
const BASIC_COMPONENTS: ComponentDefinition[] = [
  {
    type: 'header',
    name: 'Heading',
    icon: 'Heading',
    defaultProps: { text: 'New Heading', level: 2 },
    defaultSize: { width: 300, height: 50 }
  },
  {
    type: 'paragraph',
    name: 'Paragraph',
    icon: 'Type',
    defaultProps: { text: 'Enter your text here...' },
    defaultSize: { width: 300, height: 80 }
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'Square',
    defaultProps: { text: 'Click Me', variant: 'primary' },
    defaultSize: { width: 120, height: 40 },
    defaultCustomizations: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '0.5rem'
    }
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'Image',
    defaultProps: { src: '/placeholder.png', alt: 'Image' },
    defaultSize: { width: 200, height: 150 }
  },
  {
    type: 'container',
    name: 'Container',
    icon: 'Box',
    defaultProps: { text: 'Container' },
    defaultSize: { width: 300, height: 200 }
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'Minus',
    defaultProps: {},
    defaultSize: { width: 300, height: 20 }
  },
  {
    type: 'spacer',
    name: 'Spacer',
    icon: 'Space',
    defaultProps: {},
    defaultSize: { width: 300, height: 40 }
  }
]

// Glass components from ein-ui
const GLASS_COMPONENTS: ComponentDefinition[] = [
  {
    type: 'custom',
    name: 'Glass Button',
    icon: 'Sparkles',
    defaultProps: { componentType: 'glass-button', text: 'Glass Button', variant: 'primary' },
    defaultSize: { width: 140, height: 44 }
  },
  {
    type: 'custom',
    name: 'Glass Card',
    icon: 'Box',
    defaultProps: { componentType: 'glass-card', title: 'Card Title', description: 'Card description here' },
    defaultSize: { width: 320, height: 180 }
  },
  {
    type: 'custom',
    name: 'Glass Input',
    icon: 'Type',
    defaultProps: { componentType: 'glass-input', placeholder: 'Enter text...' },
    defaultSize: { width: 280, height: 48 }
  },
  {
    type: 'custom',
    name: 'Glass Badge',
    icon: 'CircleDot',
    defaultProps: { componentType: 'glass-badge', text: 'Badge' },
    defaultSize: { width: 80, height: 28 }
  },
  {
    type: 'custom',
    name: 'Glass Switch',
    icon: 'ToggleLeft',
    defaultProps: { componentType: 'glass-switch' },
    defaultSize: { width: 50, height: 28 }
  },
  {
    type: 'custom',
    name: 'Glass Checkbox',
    icon: 'CheckSquare',
    defaultProps: { componentType: 'glass-checkbox', label: 'Checkbox' },
    defaultSize: { width: 120, height: 28 }
  },
  {
    type: 'custom',
    name: 'Glass Tabs',
    icon: 'ChevronRight',
    defaultProps: { componentType: 'glass-tabs', tabs: ['Tab 1', 'Tab 2', 'Tab 3'] },
    defaultSize: { width: 300, height: 50 }
  },
  {
    type: 'custom',
    name: 'Glass Progress',
    icon: 'Gauge',
    defaultProps: { componentType: 'glass-progress', value: 60 },
    defaultSize: { width: 200, height: 12 }
  },
  {
    type: 'custom',
    name: 'Glass Slider',
    icon: 'SlidersHorizontal',
    defaultProps: { componentType: 'glass-slider', value: 50 },
    defaultSize: { width: 200, height: 28 }
  },
  {
    type: 'custom',
    name: 'Glass Avatar',
    icon: 'CircleUser',
    defaultProps: { componentType: 'glass-avatar', src: '', fallback: 'AB' },
    defaultSize: { width: 48, height: 48 }
  },
  {
    type: 'custom',
    name: 'Glass Textarea',
    icon: 'ScrollText',
    defaultProps: { componentType: 'glass-textarea', placeholder: 'Enter text...' },
    defaultSize: { width: 280, height: 100 }
  },
  {
    type: 'custom',
    name: 'Glass Select',
    icon: 'ChevronRight',
    defaultProps: { componentType: 'glass-select', options: ['Option 1', 'Option 2'] },
    defaultSize: { width: 200, height: 44 }
  },
  {
    type: 'custom',
    name: 'Glass Separator',
    icon: 'Minus',
    defaultProps: { componentType: 'glass-separator' },
    defaultSize: { width: 300, height: 20 }
  },
  {
    type: 'custom',
    name: 'Glass Skeleton',
    icon: 'Loader2',
    defaultProps: { componentType: 'glass-skeleton' },
    defaultSize: { width: 200, height: 24 }
  }
]

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heading,
  Type,
  Square,
  Image,
  Box,
  Minus,
  Space,
  Sparkles,
  CircleDot,
  CircleUser,
  ToggleLeft,
  CheckSquare,
  ChevronRight,
  Gauge,
  SlidersHorizontal,
  ScrollText,
  Loader2
}

export function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const handleAdd = (def: ComponentDefinition) => {
    onAddComponent({
      type: def.type,
      props: def.defaultProps,
      size: def.defaultSize,
      customizations: def.defaultCustomizations,
      position: { x: 50, y: 50 }
    })
  }

  return (
    <div className="space-y-6">
      {/* Basic Components */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Basic Elements
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {BASIC_COMPONENTS.map((def) => {
            const Icon = iconMap[def.icon] || Square
            return (
              <motion.button
                key={def.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAdd(def)}
                className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors text-left"
              >
                <div className="p-1.5 bg-muted rounded">
                  <Icon className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-xs font-medium">{def.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Glass Components */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Glass Components
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {GLASS_COMPONENTS.map((def) => {
            const Icon = iconMap[def.icon] || Sparkles
            return (
              <motion.button
                key={def.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAdd(def)}
                className="flex items-center gap-2 p-3 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-lg hover:border-cyan-400/50 hover:from-cyan-500/10 hover:to-purple-500/10 transition-all text-left"
              >
                <div className="p-1.5 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded">
                  <Icon className="w-4 h-4 text-cyan-300" />
                </div>
                <span className="text-xs font-medium text-white/90">{def.name.replace('Glass ', '')}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ComponentLibrary
