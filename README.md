# Smart Notes Organizer - Frontend

## Overview

Smart Notes Organizer is a web application designed to help users efficiently manage and organize their notes. This document provides an overview of the frontend features and technologies used in the application.

## Features

- **Note Management**: Create, edit, and delete notes with ease.
- **Rich Text Editing**: Utilize a rich text editor for note content with support for formatting, links, and media.
- **Category Management**: Organize notes into categories for better management.
- **Responsive Design**: The application is designed to be responsive and works well on various screen sizes.
- **Generative AI Category Suggestion**: Automatically suggest categories for notes using advanced AI models to enhance organization and productivity.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Material-UI**: A popular React UI framework for building responsive and accessible components.
- **Axios**: A promise-based HTTP client for making API requests.
- **React-Quill**: A rich text editor component for React.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd smart-notes-organizer
   ```

2. **Install Dependencies**:
   Run the following command to install all necessary packages:
   ```bash
   npm install
   ```

## Running the Application

To start the application in development mode, use the following command:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

## Usage

- **Add a Note**: Use the form to add a new note with a title, content, and category.
- **Edit a Note**: Click the edit icon next to a note to modify its details.
- **Delete a Note**: Click the delete icon to remove a note.
- **View Categories**: Fetch and view all available categories.
- **AI-Powered Category Suggestion**: When adding or editing a note, the application can suggest a category based on the content of the note. This feature uses a Generative AI model to analyze the text and provide a relevant category suggestion.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Ensure your code follows the existing coding standards and includes tests.

## GenAI Capability

The Smart Notes Organizer integrates Generative AI to enhance user experience by providing intelligent category suggestions. This feature leverages the Hugging Face API to analyze note content and suggest the most relevant category, helping users organize their notes more efficiently.

### How It Works

- **API Integration**: The frontend communicates with a backend API that uses the Hugging Face model for text classification.
- **Real-Time Suggestions**: As users type their notes, the application can suggest categories dynamically.
- **Customization**: Users can accept the suggested category or choose from existing categories.

### Future Enhancements

- **Expanded AI Models**: Incorporate additional AI models to improve suggestion accuracy.
- **User Feedback Loop**: Implement a feedback mechanism to refine AI suggestions based on user input.
