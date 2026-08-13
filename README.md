# Laser Template Builder — POC

A standalone browser app for editing laser cutter templates. Upload an SVG, LightBurn (`.lbrn2`), XCS, or image file, fill in variable values, and export a ready-to-cut file — no server required.

This is a proof-of-concept shell built on top of the [`laser-template-builder`](https://www.npmjs.com/package/laser-template-builder) component library ([source](https://github.com/RichardMcQuiston01/laser-template-builder)).

## Live demo

**https://laser-template-builder-poc.vercel.app**

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

## Deploy

The app is a static Vite build and deploys to [Vercel](https://vercel.com) with no configuration — the framework, build command (`npm run build`), and output directory (`dist`) are auto-detected.

To deploy your own copy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RichardMcQuiston01/laser-template-builder-poc)

Or import the repository at [vercel.com/new](https://vercel.com/new) to link it for automatic deploys on every push.
