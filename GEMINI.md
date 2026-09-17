# Project Overview

This is the 2025 redesign of the Instant Camera Guy website. It's a portfolio and blog for a passionate collector and repairer of vintage Polaroid cameras.

**Key Technologies:**

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Content:** Content is managed locally in `content.json`.

**Architecture:**

The application is a single-page application (SPA) built with React and Vite. It uses `react-router-dom` for routing, and the content is managed in `content.json`. The `contentService.ts` is responsible for fetching and filtering the content.

# Building and Running

**Prerequisites:**

*   Node.js
*   pnpm

**Development:**

To run the development server, use the following command:

```bash
pnpm dev
```
No need to run development to verify output 
**Building:**

To build the project for production, use the following command:

```bash
pnpm build
```

**Previewing:**

To preview the production build, use the following command:

```bash
pnpm preview
```

# Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling.
*   **Content Management:** Website content is stored in `content.json`. To update the content, modify this file.
*   **Validation:** Use `pnpm validate`, `pnpm check:content`, and `pnpm check:links` to ensure data integrity and unbroken links.
*   **Components:** Reusable UI components are located in the `components` directory.
*   **Pages:** The application's pages are located in the `pages` directory.
*   **Services:** The `contentService.ts` file is responsible for all content-related operations.
