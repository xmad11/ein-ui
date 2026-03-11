// Core types for the Visual Editor

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface ComponentCustomizations {
  fontSize?: string
  fontWeight?: string
  color?: string
  backgroundColor?: string
  borderRadius?: string
  padding?: string
  margin?: string
  lineHeight?: string
  textAlign?: 'left' | 'center' | 'right'
  opacity?: number
}

// Union type for all possible component prop values
export type ComponentPropValue = string | number | boolean | undefined | string[]

export interface ComponentProps {
  text?: string
  level?: number
  alignment?: 'left' | 'center' | 'right'
  variant?: string
  src?: string
  alt?: string
  placeholder?: string
  href?: string
  target?: string
  componentType?: string
  title?: string
  description?: string
  label?: string
  value?: number
  tabs?: string[]
  [key: string]: ComponentPropValue
}

export interface PageComponent {
  id: string
  type: 'header' | 'paragraph' | 'button' | 'image' | 'container' | 'text' | 'link' | 'input' | 'divider' | 'spacer' | 'card' | 'custom'
  position: Position
  size: Size
  props: ComponentProps
  customizations?: ComponentCustomizations
  children?: PageComponent[]
  locked?: boolean
}

export interface LayoutMetadata {
  lastModified: string
  modifiedBy: string
  version: number
}

export interface PageLayout {
  components: PageComponent[]
  metadata?: LayoutMetadata
}

export interface ThemeConfig {
  colorScheme: 'default' | 'dark' | 'light'
  spacing: 'compact' | 'normal' | 'relaxed'
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'
  typography: 'inter' | 'roboto' | 'system'
  animations: boolean
}

export interface PageSettings {
  showGrid: boolean
  snapToGrid: boolean
  gridSize: number
  showRulers: boolean
}

export interface PageConfig {
  layout: PageLayout
  theme: ThemeConfig
  settings: PageSettings
}

export interface DragState {
  isDragging: boolean
  startX: number
  startY: number
  offsetX: number
  offsetY: number
}

export interface ResizeState {
  isResizing: boolean
  handle: ResizeHandle
  startX: number
  startY: number
  startWidth: number
  startHeight: number
}

export type ResizeHandle = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'right' | 'bottom' | 'left'

// Component registry type for adding new components
export interface ComponentDefinition {
  type: PageComponent['type']
  name: string
  icon: string
  defaultProps: ComponentProps
  defaultSize: Size
  defaultCustomizations?: ComponentCustomizations
}

// Event types
export interface EditorEventData {
  position?: Partial<Position>
  size?: Partial<Size>
  props?: Partial<ComponentProps>
  customizations?: Partial<ComponentCustomizations>
  direction?: 'left' | 'right' | 'up' | 'down'
  amount?: number
}

export interface EditorEvent {
  type: 'select' | 'move' | 'resize' | 'update' | 'delete' | 'add'
  componentId?: string
  data?: EditorEventData
  timestamp: number
}
