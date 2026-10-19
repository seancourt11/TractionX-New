# AGENTS.md — project rules

- TanStack Router ≥1.170 types `errorComponent` props as `{ error: unknown; reset: () => void }` — never type the root ErrorComponent's error as `Error`, or the build fails; wrap/normalize inside the component instead.
