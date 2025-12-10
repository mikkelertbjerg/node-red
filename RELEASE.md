# Release Process

This document outlines the recommended process for releasing new versions of the compass widget.

## Quick Release

For most releases, use the `npm version` command which handles version bumping, git commit, and git tag automatically:

```bash
# Build the widget first
npm run build

# For bug fixes (0.2.0 -> 0.2.1)
npm version patch

# For new features (0.2.0 -> 0.3.0)
npm version minor

# For breaking changes (0.2.0 -> 1.0.0)
npm version major

# Publish to npm
npm publish

# Push commits and tags to GitHub
git push --follow-tags
```

## Step-by-Step Process

1. **Make your changes** and commit them
   ```bash
   git add .
   git commit -m "Add feature X"
   ```

2. **Build the widget**
   ```bash
   npm run build
   ```

3. **Bump version** (automatically commits and tags)
   ```bash
   npm version patch   # or minor/major
   ```
   This will:
   - Update version in package.json
   - Create a git commit with message "v0.2.1"
   - Create a git tag "v0.2.1"

4. **Publish to npm**
   ```bash
   npm publish
   ```

5. **Push to GitHub**
   ```bash
   git push --follow-tags
   ```

## Version Types

- **patch** (0.2.0 -> 0.2.1): Bug fixes, small tweaks
- **minor** (0.2.0 -> 0.3.0): New features, backwards compatible
- **major** (0.2.0 -> 1.0.0): Breaking changes

## Optional: Pre-release Testing

Test the package locally before publishing:

```bash
npm pack
# This creates a .tgz file you can install in another Node-RED instance
```

## Optional: Add to CHANGELOG

Update CHANGELOG.md with release notes before running `npm version`:

```markdown
## [0.2.1] - 2025-12-10
### Added
- Degree labels around compass circle

### Fixed
- Issue with XYZ
```
