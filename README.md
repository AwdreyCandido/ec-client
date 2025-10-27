
# 🛒 Next.js E-commerce Frontend 🚀

This is a **Next.js** frontend application for an e-commerce platform. It connects to an API to fetch products, stores, and manage the cart.

## ⚙️ Prerequisites

- Node.js >= 18
- npm or yarn installed
- The E-commerce API running locally or deployed

## 🧠 Setup

1. Clone this repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure API connection:

By default, the frontend points to your local API:

```ts
// export const API_PATH = "https://ec-api-production.up.railway.app";
export const API_PATH = "http://localhost:3000";
```

- To connect to a deployed API, **uncomment the first line** and comment out the second line.

## 🧩 Run the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at: `http://localhost:3001` (or the port shown in your terminal).

## Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Notes

- Ensure the API is running and accessible before using the frontend.
- All environment-related settings are in `src/utils/constants.ts`.
