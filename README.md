# 🍽️ Ambiance – Mobile Restaurant App

Ambiance is a modern restaurant mobile application built with **React Native** and **TypeScript**, allowing users to browse menu items, add items to a basket, and place orders. It features a clean UI and a scalable backend architecture.

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

![s1](https://github.com/user-attachments/assets/7cb8f9a7-be58-40c4-826c-ce4b9ed8660c)
![s2](https://github.com/user-attachments/assets/040f01f5-f4ab-4d9c-a7ef-51ae03ae0d25)
![s3](https://github.com/user-attachments/assets/63d410ca-c81c-492d-b483-841e6cd7f680)
![s4](https://github.com/user-attachments/assets/46031024-04ca-4de0-959f-9dc0ade5a771)
![s5](https://github.com/user-attachments/assets/20361fb7-9f78-4378-b343-15e3cb930233)
![s6](https://github.com/user-attachments/assets/812287aa-b451-4985-bbb5-fa4a985437fb)
![s7](https://github.com/user-attachments/assets/bd700af3-b765-4b13-bd09-760c6c61a2d6)

---
## Admin Dashboard Github Link
* Github link: ``` https://github.com/ThembelihleQueeneth/ambiance_cms.git ```
* Vercel link: ``` https://ambiance-cms.vercel.app/admin-login ```

## 👤 Author

**Thembelihle Maluka**

---


