# Vite Demo

Little SPA demo using `vite`. Node 16 or later required.

Includes:

- Vite
- Vitest
- MUI (using CSS vars for the theme)
- React Router
- React Intl
- React Query
- React Hook Form
- Yup
- Mock Service Worker for a fake REST API
- Dark mode support
- English/French translations
- Prettier
- ESLint
- Bundle analysis

## Getting started

```
npm install
npm run dev
```

## Scripts

Start the app in dev mode

```
npm run dev
```

Build the app for production (note that this also creates a `stats.html` bundle analysis.)

```
npm run build
```

Once you have built the app for production you can run it in preview mode!

```
npm run preview
```

Run the tests:

```
npm test
```

Run tests and generate a coverage report. The report can be found in the `coverage` folder.

```
npm run test:coverage
```

Check the code for lint errors:

```
npm run lint
```

Format the code using `prettier`:

```
npm run format
```

Type-check the code:

```
npm run tsc
```

Extract English translations to `temp.json`:

```
npm run extract
```
