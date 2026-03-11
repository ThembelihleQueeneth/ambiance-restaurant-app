# 🍽️ Ambiance – Mobile Restaurant App

Ambiance is a modern restaurant mobile application built with **React Native** and **TypeScript**, allowing users to browse menu items, add items to a basket, and place orders. It features a clean UI and a scalable backend architecture.

![Home](https://github.com/user-attachments/assets/318fa95d-b7b7-4821-b773-3fe1bb6702dc)
----
##  Tech Stack

### Frontend

* **React Native (Expo)**
* **TypeScript**
* **Zustand** – global state management (basket)
* **Expo Router**

### Backend

* **Node.js + Express (TypeScript)**
* **PostgreSQL** – menu & data storage
* **Firebase Authentication** – user auth only

---

## Design (Figma)

 **Figma Design Link:**
`https://www.figma.com/design/21salA7BmFlGJ7viySJVKC/Ambiance-Restaurant?node-id=0-1&p=f&t=WMlNQUj37CmvuEHC-0`

---

## 📱 Features

* Browse restaurant menu
* Add / remove items from basket
* Basket quantity increment & decrement
* Real-time basket total
* Firebase authentication
* Admin-ready backend API

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ThembelihleQueeneth/ambiance-restaurant-app.git
cd ambiance-resturant-app
```

---

### 2️⃣ Frontend Setup (Expo App)

```bash
cd app
npm install
npx expo start
```

Run on:

*  Expo Go (Android / iOS)


---

### 3️⃣ Backend Setup (Node + PostgreSQL)

```bash
cd ambiance-api
npm install
npm run dev
```

Make sure PostgreSQL is running and `.env` is configured:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ambiance_db
PORT=5000
```

---

##  Key Dependencies

### Frontend

* `expo`
* `react-native`
* `zustand`
* `firebase`
* `expo-router`

### Backend

* `express`
* `pg`
* `cors`
* `dotenv`
* `typescript`
* `ts-node-dev`

---

##  Screenshots

![Home](https://github.com/user-attachments/assets/26ab923f-e124-47d7-b6b5-f75f4de635f1)

---
## Admin Dashboard Github Link
* Github link: `https://github.com/ThembelihleQueeneth/ambiance_cms.git`
* Vercel link: `https://ambiance-cms.vercel.app/admin-login`

## 👤 Author

**Thembelihle Maluka**

---


