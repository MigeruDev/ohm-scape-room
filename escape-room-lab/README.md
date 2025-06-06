# Ohm's Escape: An Interactive Escape Room Adventure

## Description

Ohm's Escape is an immersive web-based escape room game designed to test your puzzle-solving skills and knowledge of basic electrical circuits. Navigate through a series of interconnected rooms, each presenting unique challenges and clues. Your goal is to solve all the puzzles and 'escape' before time runs out!

This project is built with Next.js and TypeScript, leveraging the App Router for navigation and server components for efficient rendering.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Running Linters](#running-linters)
- [Project Structure](#project-structure)
- [Key Technologies](#key-technologies)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm, yarn, pnpm, or bun (as per your preference)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/MigeruDev/ohm-scape-room.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ohm-scape-room/escape-room-lab
    ```
    *(Note: After repository consolidation, the project root will effectively be `escape-room-lab`)*
3.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

## Running the Development Server

To start the development server (with Turbopack):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. The page auto-updates as you edit the files.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

After building, you can start the production server with `npm run start`.

## Running Linters

To check for code quality and linting issues:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

## Project Structure

The project follows the standard Next.js App Router structure:

-   `escape-room-lab/`
    -   `public/`: Static assets.
    -   `src/`: Source code for the application.
        -   `app/`: Contains all the routes, layouts, and pages for the application.
            -   `(rooms)/`: Route group for the different escape room stages (e.g., `room1`, `final-room`).
            -   `layout.tsx`: The main application layout.
            -   `page.tsx`: The entry page of the application (e.g., landing or home page).
            -   `globals.css`: Global stylesheets.
        -   `components/`: Reusable React components used throughout the application (e.g., `Timer`, `Clue`, various quiz components).
        -   `context/`: React context providers (e.g., `GameContext` for managing game state).
        -   `hooks/`: Custom React hooks (e.g., `useSound`).
    -   `next.config.ts`: Next.js configuration file.
    -   `package.json`: Project dependencies and scripts.
    -   `tsconfig.json`: TypeScript configuration.

## Key Technologies

-   **Next.js (v15+):** React framework for server-side rendering, static site generation, and more. Using the App Router.
-   **React (v19):** JavaScript library for building user interfaces.
-   **TypeScript:** Superset of JavaScript that adds static typing.
-   **Tailwind CSS:** Utility-first CSS framework for styling.
-   **Framer Motion:** Animation library for React.
-   **@hello-pangea/dnd:** Library for accessible drag and drop functionality (likely used in puzzles).
-   **ESLint:** Pluggable linting utility for JavaScript and JSX.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if one exists, otherwise assume MIT or specify if different).
*(Note: A LICENSE file was not observed in the initial listing, but MIT is a common default for open-source projects. This can be updated if a specific license is intended.)*
