# Cherish - Social Media Memory Platform

Cherish is a social media-style memory posting platform where users can log in, create accounts, and share cherished memories.
The platform includes features like login, signup, contact forms, and post creation.

## Features

- **User Authentication**
  - Login and Signup functionality
- **Post Creation**
  - Users can create and share posts
- **Contact Forms**
  - Available on the home page and help center
- **Profile Management**
  - Basic user profiles with accounts

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**: Mongoose, bcrypt.js

## Project Setup

### Clone the Repository

```bash
git clone https://github.com/diya-patra/Cherish-Social.git
cd Cherish-Social
```

### Install Dependencies

For **client**:

```bash
cd client
npm install
```

For **server**:

```bash
cd server
npm install
```

### Run the Project

Start both the client and server:

For client:

```bash
cd client
npm run dev
```

For server:

```bash
cd server
npm start
```

## Folder Structure

```
Cherish-Social/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/ # Home, Login, Register, Account, Reels
│ │ ├── components/ # UI components
│ │ └── App.jsx
│ └── package.json
│
├── server/ # Node.js backend
│ ├── models/ # Mongoose models (User, Post, Contact)
│ ├── routes/ # API routes
│ ├── index.js # Main backend entry file
│ └── package.json
│
└── README.md
```

## Author

👩‍💻 **Diya Patra**
GitHub: [diya-patra](https://github.com/diya-patra)
