# Deployment Guide

This guide explains how to deploy the Daily-Dose application, which consists of a React frontend and a Node.js/Express backend.

## Frontend Deployment (onRender)

The frontend is a React application built with Vite.

### Steps:

1. **Build the Frontend:**
   ```bash
   npm run build
   ```
   This creates a `dist` directory with the production build.

2. **Deploy to onRender:**
   - Go to [onRender](https://render.com) and sign in.
   - Click "New" > "Static Site".
   - Connect your Git repository.
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables if needed (e.g., API endpoints).
   - Deploy.

3. **Configure Environment Variables:**
   - In onRender dashboard, go to Site settings > Environment variables.
   - Add any necessary variables like `VITE_API_URL` pointing to your backend.

## Backend Deployment (Netlify)

The backend is a Node.js/Express application.

### Prerequisites:

- Ensure your `package.json` has a `start` script: `"start": "node server.js"`
- Make sure all dependencies are listed in `package.json`.

### Steps:

1. **Prepare for Deployment:**
   - Ensure your server listens on `process.env.PORT`.
   - In `server.js`, change the port to: `const PORT = process.env.PORT || 5000;`

2. **Deploy to Netlify:**
   - Go to [Netlify](https://netlify.com) and sign in.
   - Click "New site from Git".
   - Connect your Git repository.
   - Set runtime to Node.js (if supported, or use serverless functions).
   - Set build command: `npm install`
   - Set start command: `npm start`
   - For full server, Netlify may require serverless functions. Consider converting to serverless or use Netlify Functions.
   - Add environment variables (database URL, Stripe keys, etc.).
   - Deploy.

3. **Environment Variables:**
   - `PORT`: Set by Netlify.
   - `DATABASE_URL`: Your MySQL database URL.
   - `STRIPE_SECRET_KEY`: Your Stripe secret key.
   - `REPLICATE_API_TOKEN`: Your Replicate API token.
   - Other secrets as needed.

## Database

- For production, use a cloud database like PlanetScale, Railway, or AWS RDS.
- Update the database connection in `server.js` to use the production DATABASE_URL.

## Notes

- Update the frontend's API calls to point to the deployed backend URL.
- Ensure CORS is configured correctly for the production domain.
- Test the deployed application thoroughly.
- Note: Deploying a full Express server on Netlify may require using Netlify Functions for serverless deployment.