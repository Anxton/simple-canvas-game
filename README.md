# Simple canvas game

A small 2D game engine experiment built with TypeScript, HTML5 Canvas, and Vite.

## Requirements

- Node.js
- pnpm

## Development

Install dependencies:

```bash
pnpm install
```

Start the Vite development server:

```bash
pnpm dev
```

Then open the URL shown in the terminal, usually http://localhost:5173.

## Production build

Type-check and build the application into `dist/`:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project structure

- `src/main.ts` sets up the world, entities, systems, and animation loop.
- `src/game/core/` contains the world and entity management.
- `src/game/components/` contains stores.
- `src/game/systems/` contains systems.
- `src/game/utils/` contains helpers.
