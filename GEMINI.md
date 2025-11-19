# Project Overview

This is the 2025 redesign of the Instant Camera Guy website. It's a portfolio and blog for a passionate collector and repairer of vintage Polaroid cameras.

**Key Technologies:**

*   **Framework:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Content:** Content is managed locally in `content.json` and `posts.json`.

**Architecture:**

The application is a single-page application (SPA) built with React and Vite. It uses `react-router-dom` for routing, and the content is managed in local JSON files. The `contentService.ts` is responsible for fetching and filtering the content from these JSON files.

# Building and Running

**Prerequisites:**

*   Node.js
*   pnpm

**Development:**

To run the development server, use the following command:

```bash
pnpm dev
```

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
*   **Content Management:** All website content is stored in `content.json` and `posts.json`. To update the content, modify these files.
*   **Components:** Reusable UI components are located in the `components` directory.
*   **Pages:** The application's pages are located in the `pages` directory.
*   **Services:** The `contentService.ts` file is responsible for all content-related operations.
