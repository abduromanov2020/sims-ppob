# SIMS PPOB - Digital Payment Platform

## Live Demo

Visit the live application at [sims-ppob-alfatih.vercel.app](https://sims-ppob-alfatih.vercel.app)

## Overview

SIMS PPOB is a digital payment platform that enables users to manage various bill payments and financial transactions. Built with modern web technologies, it provides a seamless experience for digital payments and account management.

## Features

- 👤 User Authentication
- 💰 Balance Management
- 💳 Digital Payments
- 📱 Bill Payments (Phone, Internet, etc.)
- 📊 Transaction History
- ⚡ Real-time Balance Updates
- 🖼️ Profile Management

## Tech Stack

- ⚛️ React + TypeScript
- 🏗️ Vite
- 🔄 Redux Toolkit + RTK Query
- 🎨 Tailwind CSS
- ✅ React Hook Form
- 🚀 Vercel Deployment

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abduromanov2020/sims-ppob.git

# Navigate to project directory
cd sims-ppob

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api-doc-tht.nutech-integrasi.com
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/       # Feature-based modules
├── hooks/          # Custom hooks
├── pages/          # Route pages
├── services/      # API services
├── store/         # Redux store config
└── utils/         # Helper functions
```

## API Integration

The application integrates with a RESTful API that provides:

- User Authentication
- Transaction Management
- Profile Management
- Payment Processing

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier
