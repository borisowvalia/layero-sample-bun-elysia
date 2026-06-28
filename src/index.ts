import { Elysia } from 'elysia'

// Native Bun server via Elysia. Layero detects `elysia` as a node_web signal,
// so this runs as a `node_web` runtime on the bun-enabled runtime-builder (v14).
// Bun.serve (which Elysia uses) binds 0.0.0.0 by default.
const port = Number(process.env.PORT ?? 3000)

const app = new Elysia()
  .get('/', () => ({
    app: 'layero-sample-bun-elysia',
    runtime: 'bun',
    engine: 'elysia',
    bun: Bun.version,
    message: 'Bun runtime (node_web) on Layero works end-to-end',
    ok: true,
  }))
  .get('/health', () => 'ok')
  .listen(port)

console.log(`bun + elysia listening on http://0.0.0.0:${port} (bun ${Bun.version})`)

export type App = typeof app
