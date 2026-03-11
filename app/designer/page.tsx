'use client'

import React, { useMemo } from 'react'
import { PageEditor, PageConfig } from '@/components/editor'

export default function DesignerPage() {
  // Demo initial data - use useMemo to create date on client side only
  const initialData: Partial<PageConfig> = useMemo(() => ({
    layout: {
      components: [
        {
          id: 'demo-header',
          type: 'header',
          position: { x: 40, y: 40 },
          size: { width: 400, height: 60 },
          props: {
            text: 'Welcome to the Designer',
            level: 1
          },
          customizations: {
            fontSize: '2xl',
            fontWeight: 'bold',
            color: 'hsl(var(--foreground))'
          }
        },
        {
          id: 'demo-paragraph',
          type: 'paragraph',
          position: { x: 40, y: 120 },
          size: { width: 400, height: 100 },
          props: {
            text: 'Click "Edit" to start designing. Drag components to reposition them. Click on a component to select it and edit its properties.'
          },
          customizations: {
            fontSize: 'base',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: '1.6'
          }
        },
        {
          id: 'demo-button',
          type: 'button',
          position: { x: 40, y: 240 },
          size: { width: 140, height: 44 },
          props: {
            text: 'Get Started',
            variant: 'primary'
          },
          customizations: {
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            borderRadius: '0.5rem'
          }
        }
      ],
      metadata: {
        lastModified: '2024-01-01T00:00:00.000Z',
        modifiedBy: 'demo-user',
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
  }), [])

  const handleSave = (config: PageConfig) => {
    console.log('Page saved:', config)
  }

  const handleAutoSave = (config: PageConfig) => {
    console.log('Auto-saved:', config.layout.metadata?.lastModified)
  }

  return (
    <PageEditor
      initialPageData={initialData}
      onSave={handleSave}
      onAutoSave={handleAutoSave}
    />
  )
}
