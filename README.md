# VESM

- based on the construction of esbuild and the sharing of projects' modules

## setup

```bash
npm i -g pnpm
pnpm i
```

## start

```bash
cd packages/vesm && pnpm link
pnpm link vesm
pnpm dev --filter="vesm-demo1" && pnpm dev --filter="vesm-demo2" 
```
