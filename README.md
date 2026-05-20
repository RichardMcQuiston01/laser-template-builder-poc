# Laser Template Builder — POC

A standalone browser app for editing laser cutter templates. Upload an SVG, LightBurn (`.lbrn2`), XCS, or image file, fill in variable values, and export a ready-to-cut file — no server required.

This is a proof-of-concept shell built on top of the [`laser-template-builder`](../laser-template-builder) component library.

## Prerequisites

- Node.js 18+

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Run

**Development** (hot-reload dev server):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Preview production build**:

```bash
npm run build
npm run preview
```
