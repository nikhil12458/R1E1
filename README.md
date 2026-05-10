# Vastraa - Quiet Luxury Marketplace

![Vastraa Banner](vastraa_banner_1778433613601.png)

Vastraa is a premium, high-fashion marketplace dedicated to the "Quiet Luxury" aesthetic. Inspired by traditional Indian craftsmanship and village-inspired textures, Vastraa merges timeless elegance with cutting-edge technology. The platform's standout feature is an **AI-powered Virtual Try-On**, allowing users to visualize how fabrics and garments look on them before making a purchase.

---

## ✨ Key Features

- **Virtual Atelier**: An AI-driven virtual dressing room that uses state-of-the-art models (FASHN VTON 1.5) to generate realistic try-on previews.
- **Editorial Experience**: A minimalist, high-fidelity UI designed with a focus on typography and whitespace, reflecting the brand's premium positioning.
- **Modular Architecture**: Built with a feature-first approach in React, ensuring scalability and maintainability.
- **Secure Authentication**: Robust JWT-based authentication with cookie-based session management.
- **Seller Dashboard**: Comprehensive tools for sellers to manage listings, variants, and inventory with cloud-based image hosting (ImageKit).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: Redux Toolkit (RTK)
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 & Vanilla CSS
- **API Client**: Axios

### Backend
- **Core**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **File Upload**: Multer & ImageKit.io
- **Security**: JWT & bcryptjs

### AI Infrastructure
- **Model**: FASHN VTON 1.5
- **Server**: FastAPI (Python)
- **Deployment**: Google Colab GPU with ngrok tunneling

---

## 📂 Project Structure

```text
R1E1/
├── Backend/                # Express Server
│   ├── src/
│   │   ├── controllers/    # Business Logic
│   │   ├── models/         # Database Schemas
│   │   ├── routes/         # API Endpoints
│   │   ├── services/       # AI & Storage Integrations
│   │   └── dao/            # Complex Aggregations
│   └── server.js           # Entry Point
│
├── Frontend/               # React Application
│   ├── src/
│   │   ├── app/            # Store & Route Config
│   │   ├── components/     # Global UI Components
│   │   └── features/       # Modular Features (Auth, Product, AI)
│   └── main.jsx            # Entry Point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- ImageKit.io API keys
- ngrok account (for AI server)

### 1. Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   IMAGEKIT_PUBLIC_KEY=your_key
   IMAGEKIT_PRIVATE_KEY=your_key
   IMAGEKIT_URL_ENDPOINT=your_endpoint
   AI_SERVER_URL=your_ngrok_url
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🎨 AI Try-On Flow

The Vastraa virtual try-on experience is seamlessly integrated into the shopping journey:

1. **Discovery**: User finds a product and selects a specific variant.
2. **Atelier**: Clicks "Virtual Try-On", which carries the garment image to the AI page.
3. **Capture**: User uploads their own photo.
4. **Generation**: The backend forwards both images to the FastAPI server (running on Colab).
5. **Preview**: The AI processes the request and returns a high-fidelity preview of the user wearing the garment.

---

## 📜 Documentation

For more detailed information, please refer to:
- [Developer Guide](DEVELOPER_GUIDE.md) - Deep dive into architecture and standards.
- [Flow & Setup Doc](flow%20&%20setup%20doc.md) - Detailed AI integration journey and optimization notes.

---

*Vastraa - Timeless Elegance, Modern Intelligence.*
