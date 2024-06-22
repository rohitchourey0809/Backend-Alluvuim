# Real-Time Chat Application Backend

This is the backend for a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with WebSocket for real-time communication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Features

- User Registration and Authentication
- Real-Time Messaging using WebSocket (Socket.io)
- JWT Authentication
- Secure and Rate Limited API

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.io
- JWT for authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohitchourey0809/Backend-Alluvuim.git
   

   Install dependencies:


2. 

```
npm install

```

Set up your environment variables. Create a .env file in the root directory and add:


Start the server:

npm start



`API Endpoints`

User Registration

```
URL: /api/auth/register
```

Method: POST

```
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

Response:

```
{
  "_id": "user_id",
  "username": "testuser",
  "email": "testuser@example.com",
  "token": "jwt_token"
}

```

`User Login`

```
URL: /api/auth/login

```


Method: POST

```
{
  "email": "testuser@example.com",
  "password": "password123"
}
```
Response:

```
{
  "_id": "user_id",
  "username": "testuser",
  "email": "testuser@example.com",
  "token": "jwt_token"
}

```

`Send Message`

```
URL: /api/chat/message

```


Method: POST

```
Headers:
Authorization: Bearer jwt_token
Body:

```

```
{
  "text": "Hello, World!",
  "room": "general"
}

```

Response:

```
{
  "user": "user_id",
  "text": "Hello, World!",
  "room": "general",
  "_id": "message_id",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}

```

`Get Messages`

```
URL: /api/chat/messages/:room

```

Method: GET

```
Headers:
Authorization: Bearer jwt_token
Response:

```
[
  {
    "_id": "message_id",
    "user": {
      "_id": "user_id",
      "username": "testuser"
    },
    "text": "Hello, World!",
    "room": "general",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]

```

Testing
Use Postman or a similar tool to test the API endpoints. Here are example requests for each route.

Register User

```
Method: POST
URL: http://localhost:8080/api/auth/register

```
Body:

```
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}

```
`Login User`

```
Method: POST
URL: http://localhost:8080/api/auth/login

```

```
{
  "email": "testuser@example.com",
  "password": "password123"
}

```

```
Send Message
Method: POST
URL: http://localhost:8080/api/chat/message
Headers:
Authorization: Bearer jwt_token

```
```
{
  "text": "Hello, World!",
  "room": "general"
}

```
```
Get Messages
Method: GET
URL: http://localhost:8080/api/chat/messages/general
Headers:
Authorization: Bearer jwt_token
```


License
This project is licensed under the MIT License - see the LICENSE file for details.
