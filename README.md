# 💬 MEAN Chat App

![CI](https://github.com/Yonoveleta/mean-chat-backend/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/Yonoveleta/mean-chat-backend)


A real-time chat application built with the **MEAN stack** (MongoDB, Express, Angular, Node.js) and **Socket.io**.  
This project simulates modern chat features such as private chats, group chats, and real-time messaging.

---

## 🚀 Features

- Real-time messaging with **Socket.io**.
- User authentication with **JWT tokens**.
- Support for **private chats** (2 participants) and **group chats**.
- MongoDB database with **Mongoose** schemas.
- Swagger API documentation for backend routes.
- Future-ready design for **roles and permissions** (like Discord).

---

## 📂 Project Structure

mean-chat-backend/
- **server.js** — Entry point (Express + Socket.io init)
- **sockets/**
  - `index.js` — Main socket loader (registerModules)
  - `userEvents.js` — User-related socket events
  - `messageEvents.js` — Messaging events
  - `roomEvents.js` — Room join/leave events
  - `disconnectEvents.js` — Cleanup + leave notifications
- **routes/**
  - `auth.js` — REST auth routes
- **models/**
  - `User.js`
  - `Chat.js`
  - `Message.js`
- **public/** — Temporary frontend testing files
- **test/** — Jest tests (optional for now)
- **data-model.md** — Mermaid ER diagram
- **package.json**
- **README.md**

## 🗃️ Database Schema

The database is MongoDB with collections for Users, Chats, and Messages.  

See the full [Database Model](db-model.md) for details.

## 📄 API Documentation

Swagger UI is available at: http://localhost:3000/api-docs

It documents all backend routes and expected request/response formats.

## ⚙️ Tech Stack

- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB, Mongoose
- **Frontend (testing):** Plain HTML + JS (Angular planned)
- **Documentation:** Swagger UI
- **Diagramming:** Mermaid (ER diagram)

## 👨‍💻 Author

Jonás Martínez Cuesta