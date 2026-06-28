# layero-sample-bun-elysia

A native **[Bun](https://bun.sh)** HTTP server using **[Elysia](https://elysiajs.com)**.

Layero lists `elysia` / `@elysiajs/core` as `node_web` signals, so this
**auto-detects as a `node_web` runtime** — no `layero.json` needed, exactly like
any npm/yarn/pnpm runtime — and is built by the bun-enabled **runtime-builder `v14`**:

```
bun install        # runtime install keeps lifecycle scripts (no --ignore-scripts)
bun src/index.ts   # start; Bun.serve binds 0.0.0.0:$PORT (default 3000)
```

It exercises Layero's **runtime** bun path end-to-end — the exact path the
runtime-builder `v13` incident broke (bun fetched from GitHub releases, outside the
builder egress allow-list; fixed in `v14` by `COPY --from` the CR builder image).

## Routes

- `GET /` → JSON `{ app, runtime: "bun", engine: "elysia", bun, ok: true }`
- `GET /health` → `ok`

## Local dev

```
bun install
bun run start    # http://localhost:3000
```

Sibling: [`layero-sample-bun-vite`](../../sample-spas/layero-sample-bun-vite) covers
the **static** bun build path (builder `v101`).
