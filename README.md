# 🌳 Family Tree Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Family Tree MVP.  
It provides endpoints to manage members, build the family tree, and calculate points distribution (with wasted points).

---

## 🚀 Features

- Node.js + Express backend
- MongoDB with Mongoose ODM
- Family tree CRUD (add members, get tree, get details)
- Points distribution logic:
  - Each new member distributes **10 points** up the ancestor chain
  - Max depth: **10 levels**
  - Remaining points are stored as **wasted**
- Stats API: total members, total distributed points, total wasted points
- Swagger API documentation (`/api-docs`)
- Error handling & rate limiting

---

## 📂 Project Structure

```
backend/
│── index.js              # Entry point
│── src/
│   ├── app.js            # Express app setup
│   ├── config/
│   │   ├── database.js   # MongoDB connection
│   │   └── swagger.js    # Swagger config
│   ├── controllers/
│   │   └── memberController.js
│   ├── services/
│   │   └── memberService.js
│   ├── models/
│   │   └── Member.js
│   ├── routes/
│   │   └── members.js
│   └── middlewares/
│       ├── errorHandler.js
│       ├── notFound.js
│       └── rateLimiter.js
└── vercel.json           # Vercel deployment config
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables: create a `.env` file:

```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## ▶️ Running Locally

Start the backend server:

```bash
npm start
```

Server will run at:

```
http://localhost:3000
```

Swagger docs at:

```
http://localhost:3000/api-docs
```

---

## 🌍 API Endpoints

### Health Check

```
GET /api/health
```

### Members

- `POST /api/members` → Add a new member
- `GET /api/members/tree` → Get full family tree
- `GET /api/members/:id` → Get member by ID
- `GET /api/members/stats` → Get statistics (total members, distributed points, wasted points)

---

## 📊 Points Distribution Logic

- Every new member brings **30 points**.
- These points are distributed as:
  - **10 points per ancestor**
  - Up to **10 levels** up the chain
- If not enough ancestors:
  - Remaining points are stored as `wastedPoints`.

---

## 🚀 Deployment (Vercel)

1. Add `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "index.js" }]
}
```

2. Push code to GitHub.
3. Deploy to Vercel with:

```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `CLIENT_URL`
   - `NODE_ENV=production`

---

## 🛠️ Tech Stack

- **Node.js** (Express)
- **MongoDB** (Mongoose)
- **Swagger** (API docs)
- **Helmet + CORS + Rate Limiting** (security)
