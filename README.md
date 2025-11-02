This is a [Next.js](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, copy env and install dependencies:

```bash
cp .env.example .env.local
npm i
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Try the AI demo at [http://localhost:3000/demo/ai](http://localhost:3000/demo/ai).

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Architecture

This project follows a feature-based, modular structure for scalability and clarity.

- Folder structure
  - `src/app/demo/ai`: AI assistant demo page
  - `src/components/ai`: AI UI components (e.g., `assistant-chat`)
  - `src/features/ai/agent`: LangGraph agent integration scaffold
  - `src/features/app/store`: Zustand app store
  - `src/db`: Drizzle ORM schema and client
  - `src/lib/redis.ts`: Redis client and cache helpers
- Coding standards
  - TypeScript strictness encouraged; meaningful names and clear comments
  - Accessibility: use `aria-*`, focus management, and semantic elements
  - Avoid tight coupling; expose feature-level public API via `index.ts`
- Quality tooling
  - Lint: ESLint with `@typescript-eslint`, `react`, `jsx-a11y`, `next/core-web-vitals`
  - Format: Prettier
  - Type-check: `tsc --noEmit`
  - Tests: plan for `vitest` + `@testing-library/react` (unit/integration)
- Scripts
  - `npm run lint` → lint source files
  - `npm run format` → format with Prettier
  - `npm run type-check` → TypeScript checks
  - `npm run test` → run test suite (if configured)

### Stack Setup

- State: `zustand` with `persist` middleware → `src/features/app/store/appStore.ts`
- Data: React Query provider wired in `src/app/providers.tsx`
- AI: LangGraph scaffold → `src/features/ai/agent/langgraph.ts` and demo at `/demo/ai`
- Cache/Sessions: `ioredis` client in `src/lib/redis.ts` (`REDIS_URL`)
- DB: Drizzle ORM with SQLite for dev → `drizzle.config.ts`, `src/db/schema.ts`, `src/db/index.ts` (`DATABASE_URL`)
- UI Components: shadcn primitives used in custom AI components; registry import for `@ai-elements` can be added when component names/registry are available

### Adding a New Feature

1. Create `src/features/<feature>/{components,services,store}` and `index.ts`.
2. Implement UI in `components/` (keep logic in `services` or `store`).
3. Export public API via `index.ts` and import it from pages.
4. Add unit tests and update README/ADR if architecture decisions change.
