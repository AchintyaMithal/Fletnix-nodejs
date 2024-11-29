# FletNix Backend

## Overview
This is the backend service for the **FletNix** application, built with **Node.js** and **Express.js**. It provides API endpoints for user authentication, retrieving movie/TV show content, and fetching content details. The backend uses **MongoDB** for data storage, and **JWT** for user authentication.

---

## Prerequisites
Ensure the following are installed on your system:

1. **Node.js** (v16 or later) and **npm**  
   - [Download Node.js](https://nodejs.org/)
2. **MongoDB**  
   - A running MongoDB instance with a valid connection string.
3. **Postman** or any API testing tool for testing endpoints.

---

## Getting Started

### Clone the Repository
Clone the repository to your local system:
```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies
Run the following command to install required packages:
npm install

### Set Up Environment Variables
Create a `.env` file in the project root and add the following environment variables:
URL=mongodb+srv://<username>:<password>@<cluster-url>/<database-name> 
JWT_SECRET=your_jwt_secret_key 
PORT=5000

- Replace `<username>`, `<password>`, `<cluster-url>`, and `<database-name>` with your MongoDB credentials.

### Start the Server
Run the following command to start the server:
npm start


## Features

### Authentication
- **User Registration**: Users can register using their email, password, and age.
- **User Login**: Users can log in with their email and password. A JWT token is returned for authentication.

### Endpoints

- **POST /register**: Registers a new user.
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword",
      "age": 25,
      "name":"John Doe"
    }
    ```

- **POST /login**: Logs in an existing user and returns a JWT token.
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "userpassword"
    }
    ```

- **GET /content/:page?**: Retrieves paginated movie/TV show content. Pagination size is 15 items per page which can be customized with page_size key in query params. The `page` parameter is optional.
  - Example: `/content/1`

- **GET /content/details/:show_id**: Retrieves detailed information for a specific movie/TV show by its `show_id`.

---

## Middleware

- **JWT Authentication**: All routes except for `/content` and `/content/1` are protected with JWT authentication. A valid JWT token must be sent in the `Authorization` header in the format `Bearer <token>`.

---

## Example of API Calls

1. **User Registration**:
   - Endpoint: `POST /register`
   - Example request:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword",
       "age": 25,
       "name":"John Doe"
     }
     ```

2. **User Login**:
   - Endpoint: `POST /login`
   - Example request:
     ```json
     {
       "email": "user@example.com",
       "password": "userpassword"
     }
     ```
   - Example response:
     ```json
     {
       "token": "<jwt_token>",
       "user": user details
     }
     ```

3. **Get Content List (Paginated)**:
   - Endpoint: `GET /content/1`
   - Example response:
     ```json
     [
       {
         "show_id": 1,
         "type": "Movie",
         "title": "Inception",
         "director": "Christopher Nolan",
         "cast": "Leonardo DiCaprio",
         "country": "USA",
         "date_added": "2020-01-01",
         "release_year": 2010,
         "rating": "PG-13",
         "duration": "148 minutes",
         "listed_in": "Action",
         "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO."
       },
       ...
     ]
     ```

4. **Get Content Details**:
   - Endpoint: `GET /content/details/1`
   - Example response:
     ```json
     {
       "show_id": 1,
       "type": "Movie",
       "title": "Inception",
       "director": "Christopher Nolan",
       "cast": "Leonardo DiCaprio",
       "country": "USA",
       "date_added": "2020-01-01",
       "release_year": 2010,
       "rating": "PG-13",
       "duration": "148 minutes",
       "listed_in": "Action",
       "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO."
     }
     ```

---

## Testing the API

You can test the backend endpoints using **Postman** or any other API testing tool. Ensure you send the JWT token for protected routes in the `Authorization` header as `Bearer <token>`.

---
