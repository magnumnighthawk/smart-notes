# Smart Notes Organizer - Backend

## Overview

The backend of the Smart Notes Organizer is designed to provide a robust API for managing notes and categories. It is built using Node.js and Express, with a MongoDB database for data persistence. This document provides instructions on how to set up, run, and contribute to the backend application.

## Features

- **RESTful API**: Provides endpoints for creating, reading, updating, and deleting notes and categories.
- **Data Validation**: Ensures data integrity with comprehensive validation rules.
- **Error Handling**: Consistent error responses for better client-side handling.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Jest**: Testing framework for ensuring code quality.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd smart-notes-organizer-backend
   ```

2. **Install Dependencies**:
   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and configure the following variables:
   ```plaintext
   PORT=4000
   ```

## Running the Application

To start the application, use the following command:

```bash
npm start
```

This will start the server and you can access the API at `http://localhost:4000`.

## Testing

The application uses Jest for testing. To run the tests, execute:

```bash
npm test
```

This will run all the test cases defined in the `tests` directory.

## API Documentation

The API provides the following endpoints:

- **GET /api/notes**: Fetch all notes.
- **POST /api/notes**: Create a new note.
- **PUT /api/notes/:id**: Update an existing note.
- **DELETE /api/notes/:id**: Delete a note.
- **GET /api/categories**: Fetch all categories.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Ensure your code follows the existing coding standards and includes tests.
