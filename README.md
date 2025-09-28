# Family Tree API

This project is a Node.js REST API for a Family Tree MVP, featuring Swagger (OpenAPI) documentation and ready for deployment on Vercel.

## Features

- Express.js REST API
- Swagger UI documentation at `/api-docs`
- Vercel deployment support

---

## Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the server:**

   ```bash
   npm start
   ```

   The API will be available at `http://localhost:3000` by default.

3. **Access Swagger Docs:**
   Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to view the API documentation.

---

## Swagger Setup

Swagger is configured in [`src/config/swagger.js`](src/config/swagger.js) using `swagger-jsdoc` and `swagger-ui-express`. The Swagger UI assets are loaded from a CDN for compatibility with Vercel's serverless environment.

**Key points:**

- The Swagger UI is served at `/api-docs`.
- CDN assets are used for Swagger UI to avoid static file issues on Vercel.
- The API base URL is set dynamically based on the environment (production or development).

---

## Deploying to Vercel

1. **Install Vercel CLI (optional):**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel
   ```

   Follow the prompts to deploy your project.

3. **Production Swagger Docs:**
   After deployment, access your API docs at `https://<your-vercel-app>.vercel.app/api-docs`.

---

## File Structure

```
index.js
src/
  config/
    swagger.js      # Swagger setup
  ...
vercel.json         # Vercel config
```

---

## Environment Variables

- `NODE_ENV` is used to determine the API base URL in Swagger docs.

---

## License

MIT
