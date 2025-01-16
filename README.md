# Setting Up an Existing React Vite Project

This guide outlines the steps to clone and run an existing React project hosted on GitHub.

## Prerequisites

Ensure you have the following installed on your system:

1. **Node.js**: Download and install the latest LTS version from [Node.js](https://nodejs.org/).
2. **npm or Yarn**: npm is included with Node.js. Alternatively, you can install [Yarn](https://yarnpkg.com/).

Verify their installation with the commands:

```bash
node -v
npm -v
```

---

## Step 1: Clone the Repository

Clone the project to your local machine using Git:

```bash
git clone https://github.com/Dreykovic/mdg-admin-panel-ui.git
```

Navigate to the project directory:

```bash
cd mdg-admin-panel-ui
```

---

## Step 2: Install Dependencies

Install the required project dependencies:

### Using npm:

```bash
npm install
```

### Using Yarn (if preferred):

```bash
yarn install
```

---

## Step 3: Available Scripts

The project includes the following npm scripts for development and management:

- **`dev`**: Starts the development server.
  ```bash
  npm run dev
  ```
  Or, with hosting enabled:
  ```bash
  npm run dev:host
  ```

- **`build`**: Compiles TypeScript and builds the project for production.
  ```bash
  npm run build
  ```

- **`lint`**: Runs ESLint to check for code issues.
  ```bash
  npm run lint
  ```

- **`lint:fix`**: Automatically fixes lint issues where possible.
  ```bash
  npm run lint:fix
  ```

- **`format`**: Formats the code using Prettier.
  ```bash
  npm run format
  ```

- **`preview`**: Serves the production build locally with hosting enabled.
  ```bash
  npm run preview
  ```

---

## Step 4: Start the Development Server

Run the development server to launch the project locally:

```bash
npm run dev
```

To enable hosting, use:

```bash
npm run dev:host
```

The development server will start, typically at `http://localhost:5173/`. Open this URL in your browser to view the application.

---

## Step 5: Building and Previewing

### Build for Production

To create an optimized production build:

```bash
npm run build
```

### Preview the Production Build

To test the production build locally:

```bash
npm run preview
```

---

## Step 6: Linting and Formatting

### Run Linting

Check your code for issues with ESLint:

```bash
npm run lint
```

### Fix Linting Issues

Automatically fix linting issues where possible:

```bash
npm run lint:fix
```

### Format Code

Use Prettier to format the code:

```bash
npm run format
```

---

## Troubleshooting

If you face issues:
1. Ensure all dependencies are correctly installed.
2. Verify that you are using the correct Node.js version.
3. Check for errors in the terminal and resolve them based on their messages.

For further details, refer to the [Vite documentation](https://vitejs.dev/) or the [GitHub repository](https://github.com/Dreykovic/mdg-admin-panel-ui.git).

---

Happy coding!

