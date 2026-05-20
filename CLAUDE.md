# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # type-check + build to dist/
npm run lint      # ESLint (TypeScript + React hooks + react-refresh rules)
npm run preview   # serve the production build locally
```

No test runner is configured.

## Architecture

This is a **standalone Vite + React POC** for the laser template builder. It is a thin shell app that wires the `laser-template-builder` component library (installed via `file:../laser-template-builder`) to a minimal in-browser workflow.

### Two-view flow

`App.tsx` holds a discriminated-union state (`upload | edit`) and renders one of two views:

- **`UploadView`** — drag-and-drop / file-picker. On file selection, calls `upload()` from `src/lib/clientProcess.ts` which detects the file extension, extracts template variable tokens, and returns a `Template` object + raw file content.
- **`EditView`** — receives the `Template` and file content. Renders `TemplateHeader` (rename/delete/convert actions) plus either `ImageEditor` (for `IMAGE` source format) or `VariableEditor` (for SVG/LBRN2/XCS). Export triggers `exportFile()` which calls the appropriate `render*File` function and returns a `Blob` for download.

### `src/lib/clientProcess.ts`

All file I/O logic lives here — no server involved. Upload and export both run entirely in the browser:

- `upload(file)` — reads file, calls `extract*Tokens()` from the library, builds a local `Template` stub with `crypto.randomUUID()`.
- `exportFile(request, fileContent, variables, name)` — dispatches to `renderSvgFile` / `renderLightBurnFile` / `renderXcsFile` and returns `{ blob, filename }`.

### `laser-template-builder` (npm package)

The library ([npmjs.com/package/laser-template-builder](https://www.npmjs.com/package/laser-template-builder)) provides all React components and format processing logic. Key exports used here:

| Export | Purpose |
|---|---|
| `TemplateHeader` | Header bar with rename/delete/convert actions |
| `VariableEditor` | Token substitution UI + export for SVG/LBRN2/XCS |
| `ImageEditor` | Drag-to-place textbox overlay editor for image templates |
| `extract*Tokens` | Parse `{{token}}` placeholders from SVG/LBRN2/XCS files |
| `render*File` | Substitute variable values and return the rendered file string/buffer |
| `Template`, `TemplateVariable`, `ExportRequest`, etc. | Shared TypeScript types |

The Tailwind config includes the library's `dist/` JS files in the `content` array so that Tailwind classes used inside the library are included in the POC's generated CSS.

### Supported file formats

| Extension | SourceFormat | Token extraction | Export |
|---|---|---|---|
| `.svg` | `SVG` | `extractSvgTokens` | `renderSvgFile` |
| `.lbrn2` | `LBRN2` | `extractLightBurnTokens` | `renderLightBurnFile` |
| `.xcs` | `XCS` | `extractXcsTokens` (async, ZIP-based) | `renderXcsFile` |
| `.png/.jpg/.webp` | `IMAGE` | none (textbox overlays only) | image SVG/PNG export |

### Tailwind brand palette

Custom `brand` color scale (`50`/`100`/`500`/`600`/`700`/`900`) maps to sky blue tones. Use `brand-*` classes for POC UI; the library components ship their own Tailwind classes.
