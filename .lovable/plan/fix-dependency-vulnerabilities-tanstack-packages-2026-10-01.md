# Fix dependency vulnerabilities (TanStack packages)

The security scan found 10 known vulnerabilities (7 high, 3 moderate), all inside the TanStack framework packages the site is built on — none in code we wrote. The fix is updating those packages so they pull in the patched underlying libraries.

## Steps

1. **Update packages** — upgrade `@tanstack/react-start` and `@tanstack/router-plugin` (and related `@tanstack/*` packages together, since they version in lockstep) to the latest releases.
2. **Re-scan dependencies** — confirm the 10 advisories are gone.
3. **Verify the site** — type check, build check, and a quick browser pass over the homepage, a rental page, and the booth builder to confirm nothing regressed.

## Notes

- No design, content, or feature changes — this is purely a security maintenance update.
- If the latest TanStack version introduces a breaking change, I'll stop and report rather than force it.
