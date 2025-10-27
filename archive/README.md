# Archive Directory

This directory contains deprecated code, assets, and documentation that are no longer actively used but preserved for reference.

## Structure

### `/reports`
Contains previous versions of the assessment report system (v2, v3, v4). The active version is v5 in the main codebase.

- **pages/**: Old report page components
- **components/**: Old report UI components

Each version is preserved with its full implementation for reference or potential restoration.

### `/fonts`
Contains duplicate font files that were moved from `src/components/font`. The canonical font location is `public/fonts`.

### `/documentation`
Contains design artifacts, screenshots, and planning documents from development. Organized by date for historical reference.

## Restoration

If you need to restore any archived version:

1. Copy the desired files from the archive
2. Update import paths in your application
3. Test thoroughly before deploying

## Last Updated
October 27, 2025
