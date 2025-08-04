# Project Architecture

DeepNews is a Single Page Application (SPA) built primarily with React and TypeScript, styled using Tailwind CSS. The application follows a component-based architecture, promoting reusability and maintainability.

## Core Technologies

*   **React:** The primary library for building the user interface. Components are functional components utilizing React Hooks for state management and side effects.
*   **TypeScript:** Provides static typing to the JavaScript codebase, enhancing code quality, readability, and reducing runtime errors.
*   **Tailwind CSS:** A utility-first CSS framework that allows for rapid UI development by composing classes directly in the JSX.
*   **Vite:** Used as the build tool, offering fast cold starts and hot module replacement (HMR) for an efficient development experience.
*   **React Router DOM:** Manages client-side routing, enabling navigation between different views (pages) of the application without full page reloads.

## Application Structure

The `src` directory is organized into several key subdirectories:

*   **`components/`**: Contains reusable UI components. These are typically presentational components that receive data via props and render UI elements. Examples include `Header`, `Footer`, `ArticleCard`, `ArticleGrid`, `Hero`, `Newsletter`, and various modal components (`LoginModal`, `SignupModal`, `SearchModal`, `ArticleModal`).
    *   `auth/`: A sub-directory within `components` specifically for authentication-related UI components.
*   **`contexts/`**: Houses React Context API providers. The `AuthContext.tsx` is a prime example, providing authentication state and functions to its consuming components throughout the application.
*   **`data/`**: Stores mock data or static data used within the application, such as `mockData.ts` and `articles.ts`.
*   **`hooks/`**: Contains custom React Hooks. These hooks encapsulate reusable logic and stateful behavior, such as `useArticles`, `useTrending`, `useSearch`, and `useCategories`.
*   **`lib/`**: Dedicated to utility functions, API service integrations, and third-party library configurations. This includes `api.ts` for general API calls, `supabase.ts` for Supabase client initialization, `supabase-api.ts` for Supabase-specific API interactions, `local-api.ts` for local API simulations, and `trending-api.ts` for trending news specific API calls.
*   **`pages/`**: Represents the main views or routes of the application. Each file in this directory typically corresponds to a route defined in `App.tsx`. Examples include `Home`, `Categories`, `Trending`, and `About`.
*   **`types/`**: Defines TypeScript interfaces and types used across the application, ensuring type safety and clarity.
*   **`App.tsx`**: The main application component, responsible for setting up the React Router and defining the application's routes. It also wraps the application with the `AuthProvider` and `Layout` component.
*   **`main.tsx`**: The entry point of the React application, responsible for rendering the `App` component into the DOM.
*   **`index.css`**: The main CSS file, primarily utilizing Tailwind CSS directives and custom utility classes.

## Data Flow and State Management

State management is primarily handled using React's built-in `useState` and `useContext` hooks. For global state, such as authentication status, the Context API (`AuthContext`) is used. Data fetching from APIs is managed within custom hooks (e.g., `useArticles`, `useTrending`), which then update component states.

## API Integration

The application interacts with various APIs, including a potential Supabase backend for authentication and data storage, and other external APIs for news content. API calls are centralized within the `lib/` directory to maintain a clear separation of concerns and facilitate easier maintenance or swapping of API services.

## Styling

Tailwind CSS is used for styling, allowing for a highly customizable and efficient styling workflow. Custom CSS is minimal and primarily used for specific utility classes or overrides defined in `index.css`.

## Build Process

Vite handles the build process, bundling the React and TypeScript code into optimized static assets for deployment. The `vite.config.ts` file configures the build process, including plugins and development server settings.
