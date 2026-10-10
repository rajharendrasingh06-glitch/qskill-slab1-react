# QSkill Slab 1 — Front-End Development

A responsive web application built with **React, Vite, and Tailwind CSS** for the QSkill Front-End Development internship assignment.

The project demonstrates three core front-end tasks: an English text translator, a random string generator, and client-side routing.

## Features

### 1. English Text Translator

* Translate English text into a selected language.
* Integrate with a translation API through RapidAPI.
* Configure API credentials and requests according to the selected provider.
* Display a setup message when the API is not configured.

### 2. Random String Generator

* Generate random strings with a configurable length.
* Select the character sets used to generate strings.
* Copy generated strings and view recent results.
* Demonstrate React Hooks: `useState`, `useCallback`, and `useEffect`.

### 3. Client-Side Routing

* Navigate between pages without full-page reloads.
* Use `react-router-dom` to manage application routes.

## Technology Stack

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| React            | UI components and application logic     |
| Vite             | Development server and production build |
| Tailwind CSS     | Responsive styling                      |
| JavaScript       | Application functionality               |
| React Router DOM | Client-side navigation                  |
| React Hooks      | State and component behavior            |
| RapidAPI         | Translation API integration             |

## Application Routes

| Route         | Page                    |
| ------------- | ----------------------- |
| `/`           | Dashboard               |
| `/translator` | English Text Translator |
| `/generator`  | Random String Generator |
| `/about`      | About the Project       |

## Prerequisites

Install the following before running the project:

* Node.js 18 or later
* npm
* Visual Studio Code (recommended)
* A RapidAPI account and a compatible translation API subscription/key

## Getting Started

### 1. Open the project

Clone the repository or download the project ZIP, then open the project folder in Visual Studio Code.

### 2. Install dependencies

Open the terminal in the project directory and run:

```bash
npm install
```

### 3. Configure the translation API

Create a `.env.local` file in the project root and add the values required by your selected RapidAPI provider:

```env
VITE_TRANSLATE_API_URL=your_api_endpoint
VITE_RAPIDAPI_KEY=your_api_key
VITE_RAPIDAPI_HOST=your_api_host
```

Replace the placeholder values with the actual endpoint, key, and host. Confirm that the request body and response parsing in `src/pages/Translator.jsx` match the provider's documentation.

**Security:** Do not commit real API credentials to GitHub. Variables prefixed with `VITE_` are exposed in the client-side production bundle. Use a server-side proxy to protect API keys in public deployments.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal. The default Vite URL is usually `http://localhost:5173`.

## Build and Preview

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files are saved in the `dist/` directory.

## Deployment

The application can be deployed to GitHub Pages, Netlify, or Vercel.

For GitHub Pages:

1. Configure Vite's `base` path to match the repository name.
2. Build the application using `npm run build`.
3. Deploy the generated `dist/` directory.
4. Configure the deployment to support React Router navigation and direct access to application routes.

## Learning Outcomes

By completing this project, you can demonstrate:

* Building responsive user interfaces with React and Tailwind CSS.
* Managing state and behavior using React Hooks.
* Integrating a third-party API.
* Implementing client-side routing.
* Creating and testing a production build with Vite.

## Assignment Information

* **Program:** QSkill Front-End Development Internship
* **Slab:** Slab 1 — Beginner
* **Domain:** Front-End Development
* **Core Technologies:** React and Tailwind CSS
