# layero-sample-bun-elysia

A native **[Bun](https://bun.sh)** HTTP server using **[Elysia](https://elysiajs.com)**.

This declares `"runtime": "node_web"` in `layero.json` so it deploys as a
**`node_web` runtime** built by the bun-enabled **runtime-builder `v14`**:

> Why the explicit `layero.json`? Layero lists `elysia` / `@elysiajs/core` as
> `node_web` *signals*, but that signal lives in the detection spec only as of the
> Phase-4 bun work, which postdates the **static builder `v101`** image that runs the
> detect/route stage. Until the static builder is rebuilt past that commit, a bare
> Elysia repo fails detect with *"runtime config is missing"*; `layero.json`
> (precedence over signals) routes it deterministically. Once the builder is
> rebuilt, the `layero.json` becomes optional.

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
