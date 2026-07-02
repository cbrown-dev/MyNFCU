# Plaid Pattern

A full-stack banking application demonstrating integration with the Plaid API using React, Vite, Express, and Node.js. This project provides a modern frontend for securely linking bank accounts through Plaid Link while an Express backend handles communication with the Plaid API.

---

## Features

- 🔐 Secure Plaid Link integration
- 🏦 Connect financial institutions
- ⚡ React 19 frontend powered by Vite
- 🌐 Express REST API backend
- 🔄 Axios API communication
- 🌱 Environment variable configuration with dotenv

---

## Tech Stack

### Frontend

- React 19
- Vite
- Axios
- React Plaid Link

### Backend

- Node.js
- Express
- Plaid SDK
- dotenv
- body-parser
- cors

---

## Project Structure

```
Plaid-Pattern/
│
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/                 # Express backend
│   ├── index.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Prerequisites

Before running the application, install:

- Node.js 18+
- npm
- Plaid Developer Account

---

## Installation

Clone the repository.

```bash
git clone https://github.com/yourusername/plaid-pattern.git

cd plaid-pattern
```

Install frontend dependencies.

```bash
cd client
npm install
```

Install backend dependencies.

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** directory.

Example:

```env
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox
```

> Never commit your `.env` file.

---

## Running the Application

### Start the backend

```bash
cd server
npm run server
```

The server will start using Nodemon.

---

### Start the frontend

Open another terminal.

```bash
cd client
npm run dev
```

Vite will launch the development server.

---

## Available Scripts

### Client

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Start Vite development server |
| `npm run build`   | Production build              |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint                    |

### Server

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `npm run server` | Start Express server with Nodemon |

---

## API Overview

The backend communicates directly with the Plaid API to:

- Generate Link Tokens
- Exchange Public Tokens
- Retrieve account information
- Retrieve transaction data

The React frontend communicates exclusively with the Express backend using Axios.

---

## Development

This project follows a client/server architecture:

```
Browser
    │
React + Vite
    │
 Axios
    │
Express API
    │
 Plaid SDK
    │
 Plaid API
```

---

## Future Improvements

- Authentication
- Database integration
- Transaction categorization
- Spending analytics dashboard
- Investment account support
- Budgeting tools
- Account persistence
- Unit and integration testing

---

## License

ISC
