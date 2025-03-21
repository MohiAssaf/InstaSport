# Sports Social Media Platform (InstaSport)

## Description
This is a sports-focused social media platform, similar to Instagram but exclusively for sports-related content. Users can browse a catalog of posts, like and comment on them (if logged in), and create, edit, or delete their own posts. The project consists of a frontend built with React.js and Vite, and a backend server that handles CRUD operations.

## Features
- User authentication (login required for likes, comments, and posting and accessing protected pages)
- Browse a catalog of sports-related posts
- Like and comment on posts
- Create posts (logged-in users)
- Edit and Delete posts (author-only permissions)

---


## How to Run the Project


### 1. Clone the Repository and Navigate to the Project Directory
```sh
git clone https://github.com/MohiAssaf/InstaSport.git
```

```sh
cd InstaSport 
```
---

## Running the Backend (Server)

1. Navigate to the `server` directory:
   ```sh
   cd server
   ```

2. Start the server:
   ```sh
   node server.js
   ```
   The server should now be running on `http://localhost:3030`

---

## Running the Frontend (Client)

1. Navigate to the `client` directory:
   ```sh
   cd client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```
   The client should now be running on `http://localhost:5173`



