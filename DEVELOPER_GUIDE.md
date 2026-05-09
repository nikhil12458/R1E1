# Vastraa - Project Documentation & Developer Guide

Welcome to the **Vastraa** codebase. Vastraa is a premium "Quiet Luxury" marketplace for high-fashion apparel, featuring an AI-powered virtual try-on experience. This document provides a comprehensive overview of the project's architecture, folder structure, and key implementation details to help you get started quickly.

---

## 🚀 Tech Stack

### Backend
- **Core**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with Cookie-based storage
- **File Upload**: Multer and ImageKit.io for cloud storage
- **Validation**: Express-Validator
- **Logging**: Morgan

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: Redux Toolkit (RTK)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 (Vanilla CSS fallback)
- **API Client**: Axios

---

## 📦 Dependencies

### Backend Dependencies
| Package | Purpose |
| :--- | :--- |
| `express` | Web framework for Node.js |
| `mongoose` | MongoDB object modeling tool |
| `jsonwebtoken` | JWT implementation for authentication |
| `bcryptjs` / `bcrypt` | Password hashing and security |
| `@imagekit/nodejs` | ImageKit SDK for cloud image storage |
| `multer` | Middleware for handling `multipart/form-data` (uploads) |
| `express-validator` | Input validation and sanitization |
| `cookie-parser` | Parse HTTP request cookies |
| `cors` | Cross-Origin Resource Sharing support |
| `dotenv` | Environment variable management |
| `morgan` | HTTP request logger |
| `axios` | Promise-based HTTP client for external requests |
| `form-data` | Module to create readable "multipart/form-data" streams |

### Frontend Dependencies
| Package | Purpose |
| :--- | :--- |
| `react` / `react-dom` | Core library and DOM renderer |
| `react-router` | Client-side routing (v7) |
| `@reduxjs/toolkit` | Official, opinionated toolset for Redux |
| `react-redux` | Official React UI bindings for Redux |
| `axios` | HTTP client for API communication |
| `tailwindcss` | Utility-first CSS framework |
| `@tailwindcss/vite` | Vite plugin for Tailwind CSS 4 |

---

## 📂 Project Structure

```text
R1E1/
├── Backend/                # Express Server
│   ├── src/
│   │   ├── config/         # Environment & Third-party configurations
│   │   ├── controllers/    # Request handlers & Business logic
│   │   ├── dao/            # Data Access Objects (Complex Aggregations)
│   │   ├── middlewares/    # Auth & Role-based access control
│   │   ├── models/         # Mongoose Schemas (User, Product, Cart)
│   │   ├── routes/         # API Endpoint definitions
│   │   ├── services/       # External integrations (AI Server, ImageKit)
│   │   └── validator/      # Request body validation schemas
│   ├── server.js           # Server entry point
│   └── .env                # Environment variables
│
├── Frontend/               # React Application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── app/            # Global routes and Redux store setup
│   │   ├── components/     # Reusable UI components (Layout, Common)
│   │   ├── features/       # Modular features (AI, Auth, Product, Cart)
│   │   │   └── [feature]/  # components, hooks, service, state, pages
│   │   └── main.jsx        # App entry point
│   └── vite.config.js      # Vite configuration
```

---

## 🛠️ Backend Deep Dive

### 1. Core Logic (`src/controllers/`)
- **auth.controller.js**: Handles user registration, login, and session retrieval.
- **product.controller.js**: Manages product CRUD, including variants and seller-specific listings.
- **cart.controller.js**: Logic for managing the shopping cart state.
- **ai.controller.js**: Orchestrates the communication with the AI Try-On server.

### 2. Database Models (`src/models/`)
- **user.model.js**: Unified schema for Buyers, Sellers, and Admins.
- **product.model.js**: Supports flexible product attributes and nested variants.
- **cart.model.js**: Links users to their selected products/variants.
- **Shared Schemas**: `address.schema.js` and `price.schema.js` are reused across models.

### 3. Middleware (`src/middlewares/`)
- **auth.middleware.js**: Contains `authenticateUser`, `authorizeRoles`, and `checkProductAccess`. These ensure only authorized users can modify their own products or access seller dashboards.

### 4. Data Access Layer (`src/dao/`)
- Used for complex MongoDB aggregations, such as calculating total cart prices and joining product details in `cart.dao.js`.

---

## 🎨 Frontend Deep Dive

### 1. Feature-Based Architecture
The project follows a modular feature structure under `src/features/`. Each feature (e.g., `product`) is self-contained:
- **pages/**: Route-level components (e.g., `ProductDetail.jsx`).
- **state/**: Redux slices for that specific feature.
- **service/**: API call logic using Axios.
- **hook/**: Custom React hooks (e.g., `useProduct.js`) to expose state and actions.

### 2. Global State (`src/app/app.store.js`)
Uses Redux Toolkit to combine slices:
- `auth`: Manages current user session.
- `product`: Manages global and seller-specific product lists.

### 3. Routing (`src/app/app.routes.jsx`)
Defines the navigation structure.
- **Protected Routes**: Wrapped in the `<Protected />` component to enforce role-based access (e.g., only sellers can access `/seller/dashboard`).

---

## 🔑 Key Workflows

### Authentication
1. User submits login/register form.
2. Backend validates data and generates a JWT.
3. JWT is sent to the client via a `httpOnly` cookie.
4. `useAuth` hook in the frontend updates the Redux `auth` state.

### AI Virtual Try-On
1. User uploads a "Person" image and a "Garment" image in `AITryOnPage.jsx`.
2. `useAITryOn` hook sends these to the Backend `/api/ai/generate-preview`.
3. Backend forwards the buffers to the AI Server.
4. AI Server returns an `arraybuffer` (image), which is displayed as a `blob` URL on the frontend.

### Product Management (Sellers)
1. Sellers use the `Dashboard` to view their products.
2. `CreateProduct.jsx` handles multi-part form data (text + images) using Multer.
3. Product images are uploaded to ImageKit via `storage.service.js`.

---

## ⚙️ Setup Instructions

1. **Backend**:
   - Install dependencies: `npm install`
   - Configure `.env` with `MONGO_URI`, `JWT_SECRET`, and `IMAGEKIT` keys.
   - Run server: `npm run dev`

2. **Frontend**:
   - Install dependencies: `npm install`
   - Run dev server: `npm run dev` (Runs on port 5173 by default)

---

## 📜 Coding Standards
- **Naming**: Use camelCase for variables/functions and PascalCase for components.
- **Async/Await**: Always use try/catch blocks for API calls and database operations.
- **Components**: Keep components small and functional. Use hooks for logic.
