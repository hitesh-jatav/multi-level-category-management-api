# 🗃️ Multi-Level Category Management API

A robust Node.js + Express + TypeScript API for managing nested categories with JWT authentication.

---

## 📌 Objective

Build an API that supports:

- Nested category creation and management.
- JWT-based user authentication.
- Tree-structured retrieval of categories.
- Automatic reassigning of subcategories upon deletion.
- Cascading inactive status to subcategories.

---

## 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **JWT Authentication**

---

## 🚀 Getting Started

### 🔁 Step 1: Clone the Repository

```bash
git clone https://github.com/hitesh-jatav/multi-level-category-management-api.git
cd multi-level-category-management-api
```

### Step 2: Install Dependencies
npm i

### Step 3: Create Environment File
Then paste the following content into .env:

PORT=5000
MONGO_URI=mongodb://localhost:27017/category-api
JWT_SECRET=your_jwt_secret

### Step 4: Run the Project
npm run serve

