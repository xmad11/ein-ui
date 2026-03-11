# Designer Page - Complete Issues & Enhancements List

## 🔴 CRITICAL FIXES (Must Do First)

### 1. Undo/Redo Not Working
**Issue**: History is updated on EVERY mouse move during drag, creating 100+ entries
**Location**: `hooks/usePageConfig.ts` lines 81-108
**Fix**:
- Only add to history on drag END (mouse up), not during drag
- Implement debouncing for rapid updates
- Limit history to 50 entries max

### 2. Panel Doesn't Toggle in Edit Mode
**Issue**: Race condition in toggleEditMode using stale closure
**Location**: `hooks/useEditMode.ts` lines 34-43
**Fix**: Use functional state update `setEditMode(prev => ...)` correctly

### 3. Multiple Components Move Together
**Issue**: Click and mousedown handlers conflict, dragState checked before set
**Location**: `PageRenderer.tsx` lines 427-434
**Fix**:
- Only allow drag on SELECTED component
- Separate selection from drag start
- Add check `if (selectedComponentId !== component.id) return`

### 4. Resize Not Accurate
**Issue**: Complex position adjustment inside width calculation
**Location**: `PageRenderer.tsx` lines 124-158
**Fix**:
- Refactor with cleaner logic
- Add visual preview during resize
- Apply grid snapping to resize

### 5. Mobile Horizontal Overflow
**Issue**: Page wider than screen on mobile
**Location**: Multiple - scroll lock conflicts
**Fix**:
- Unified scroll lock approach
- Ensure canvas fits viewport
- Add proper viewport meta handling

---

## 🟡 UI/UX IMPROVEMENTS

### 6. Header Changes
- [ ] Remove home icon from header
- [ ] Create left side menu with:
  - Home link at top
  - Dark/light mode toggle
  - Page settings
  - Screen size preview icons (mobile, tablet, PC)

### 7. Single Edit/View Toggle Button
- [ ] Remove separate View button
- [ ] Single button that toggles between "Edit" / "View"
- [ ] Button changes label based on current mode

### 8. Side Panel Improvements
- [ ] Fix toggle to work in ALL modes
- [ ] Settings button on component should toggle panel
- [ ] Panel should close when clicking outside

---

## 🟢 NEW FEATURES

### 9. Screen Size Preview System
**Priority**: HIGH
**Implementation**:
```
┌─────────────────────────────────────────┐
│ [📱] [📱] [💻]  ← Size selector icons    │
├─────────────────────────────────────────┤
│  ┌─────────┐                            │
│  │ Mobile  │  ← Device frame preview    │
│  │ 375×667 │                            │
│  │         │                            │
│  │ [content]│                           │
│  └─────────┘                            │
└─────────────────────────────────────────┘
```

- [ ] Add 3 size modes: mobile (375px), tablet (768px), desktop (1024px+)
- [ ] Each size maintains independent layout
- [ ] Option to sync changes across sizes
- [ ] Device frame with accurate dimensions
- [ ] Auto-scale to fit preview area

### 10. Responsive State Architecture
```typescript
interface ResponsiveState {
  global: {
    components: ComponentRegistry;
    theme: ThemeConfig;
  };
  breakpoints: {
    [key: string]: {
      components: { [id: string]: BreakpointComponentState };
    };
  };
  activeBreakpoint: string;
}
```

- [ ] Breakpoint-aware state storage
- [ ] Inheritance cascade (desktop → tablet → mobile)
- [ ] Customization flags per breakpoint
- [ ] Sync toggle option

### 11. Drag & Drop Enhancements
- [ ] Add rotation support (rotation handle)
- [ ] Multi-select marquee (drag to select multiple)
- [ ] Snap to other components (not just grid)
- [ ] Keyboard nudge (arrow keys)
- [ ] Copy/paste components
- [ ] Undo/redo per component

---

## 📁 FILES TO MODIFY

### Critical Fixes:
1. `/components/editor/hooks/usePageConfig.ts` - Fix undo/redo history
2. `/components/editor/hooks/useEditMode.ts` - Fix panel toggle
3. `/components/editor/PageRenderer.tsx` - Fix drag/resize logic
4. `/components/editor/DesignerHeader.tsx` - Remove home, add side menu

### New Components:
1. `/components/editor/DesignerSideMenu.tsx` - New side menu
2. `/components/editor/DevicePreview.tsx` - Screen size preview
3. `/components/editor/hooks/useResponsivePreview.ts` - Responsive state
4. `/components/editor/types.ts` - Add new types

---

## 🎯 IMPLEMENTATION ORDER

### Phase 1: Critical Fixes (Do First)
1. Fix undo/redo history
2. Fix panel toggle
3. Fix component selection isolation
4. Fix resize accuracy
5. Fix mobile overflow

### Phase 2: UI Improvements
1. Create side menu
2. Single toggle button
3. Remove home from header

### Phase 3: Screen Size Preview
1. Add size selector icons
2. Create device frame component
3. Implement responsive state
4. Add sync/cascade options

### Phase 4: Enhancements
1. Add rotation
2. Add multi-select
3. Add keyboard shortcuts
4. Performance optimizations

---

## 📊 RESEARCH SOURCES

### Tools & Libraries:
- **dnd-kit**: Best for visual editors, collision detection, accessibility
- **Framer Motion**: Already installed, great for animations
- **react-rnd**: Alternative for resize+drag (if needed)

### Professional Tools Analyzed:
- **Figma**: Constraint-based layouts, Auto Layout
- **Webflow**: True responsive breakpoints, cascade inheritance
- **Framer**: Stack components, size-aware logic

### Best Practices:
- Debounce history updates during drag
- Use RAF for smooth animations
- Memoize components by breakpoint
- Virtualize device frames for performance
