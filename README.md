# AEO Playwright Tests

Short guide to the project’s purpose, patterns, and commands.

## What this project does

End‑to‑end UI tests for **aeo.eu** using **Playwright + TypeScript**. The suite validates key shopping flows (navigation, filtering/sorting, auth, etc.) with stable selectors and layered abstractions for maintainability.

## Architecture & Patterns

* **Page Object Model (POM):**

  * `pages/*` encapsulates page‑level actions and assertions (e.g., `HomePage`, `AuthPage`).
* **Element Object / UI Components:**

  * Reusable widgets like inputs, dropdowns, product cards (e.g., `elements/*` or `components/*`).
* **Steps Layer:**

  * `steps/*` composes user scenarios ("business steps") built on top of POM/components. Improves readability and reuse.
* **Context / DI:**

  * `AppContext` wires pages/components for each test, keeping `beforeEach` clean.
* **Value Objects & Test Data:**

  * `valueObjects/*` (e.g., `User`) + Faker for realistic data with clear typing.
* **Locators Storage:**

  * `locatorsStorage/*` centralizes selectors. Prefer `data-testid`/roles over CSS classes/text.
* **Reporting & Artifacts:**

  * HTML report (Playwright) + Allure (`allure-results`, screenshots, videos, traces on failure).

## Environment

Create `.env` from the example and set variables as needed:

```
BASE_URL=https://www.aeo.eu
LOGIN=your_email@example.com
PASSWORD=your_password
```

## Commands

Install & prepare:

```bash
npm ci            # or: npm i
npx playwright install
```

Run tests:

```bash
npm test                    # headless run
npm run test:ui             # Playwright UI mode
npm run test:debug          # headed + trace for a focused run
```

Reports & artifacts:

```bash
npm run report              # open Playwright HTML report
npm run allure:clean && \
  npm run allure:gen && \
  npm run allure:open       # generate & view Allure
```

Quality gates:

```bash
npm run lint
npm run format
```
