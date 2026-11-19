# Testing and Quality Rules

- Check `package.json` scripts before running commands. Run `npm run lint`, `npx tsc --noEmit` and `npm run build` before claiming done.
- Mock Campus Hire (`lib/campus-hire/mock.ts`) in tests; never call real services.
- Report exact commands and outcomes; distinguish skipped from passing.
