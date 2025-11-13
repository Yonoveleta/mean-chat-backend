# 💬 MEAN Chat App

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
├─ server.js # Main server file
├─ socket.js # Socket.io event handlers
├─ routes/
│ └─ auth.js # Authentication routes
├─ models/
│ ├─ User.js
│ ├─ Chat.js
│ └─ Message.js
├─ public/ # Static frontend testing files
├─ data-model.md # Mermaid ER diagram of database
├─ package.json
└─ README.md

## 🗃️ Database Schema

The database is MongoDB with collections for Users, Chats, and Messages.  

See the full [Database Model](data-model.md) for details.

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