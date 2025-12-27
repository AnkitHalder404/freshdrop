# ⚠️ IMPORTANT: Legacy Files

The following folders in the root directory are **old prototype files** and are no longer used:

- `/pages/` - Old page components
- `/components/` - Old UI components  
- `/services/` - Old service files (replaced by `/src/services/`)

## Current Active Structure

All active code is now in the `/src/` directory:

```
src/
├── components/
├── pages/
├── services/
├── contexts/
├── lib/
└── ...
```

## What To Do

You have two options:

### Option 1: Delete Old Files (Recommended)
Delete these root-level folders to avoid confusion:
- `pages/`
- `components/`
- `services/` (root level, not src/services)

### Option 2: Keep for Reference
If you want to keep them as reference while migrating features, that's fine. 
They won't be included in the build since tsconfig only includes `src/`.

The TypeScript errors you're seeing are from these old files being outside 
the `src/` directory and not properly configured.

## Current Build Status

The application builds successfully because tsconfig.json is configured to 
only compile files in the `src/` directory:

```json
{
  "include": ["src"]
}
```

The old files are ignored by the compiler but may show errors in the editor.
