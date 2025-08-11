# Smart Task Summarizer

## Overview

The Smart Task Summarizer is an AI-powered web application designed to streamline task management. It leverages advanced AI models to summarize tasks, extract relevant tags, and assign priority levels, making it easier for teams to organize and prioritize their work effectively.

## Key Features

- **Task Input**: Users can input tasks via a text area, either individually or in bulk.
- **AI-Powered Summarization**: Automatically generates concise summaries for each task.
- **Tag Extraction**: Identifies and extracts relevant tags based on task content.
- **Priority Assignment**: Assigns priority levels (1-5) to tasks based on their urgency and importance.
- **CSV Export**: Allows users to export processed tasks to a CSV file for further use.
- **Sample Tasks**: Includes preloaded sample tasks for quick testing.

## Technical Architecture

- **Frontend**: Built with React, providing a responsive and user-friendly interface.
- **Backend**: Developed using Node.js and Express, handling API requests and integrating with AI services.
- **AI Integration**: Utilizes the DeepSeek API from OpenRouter for task processing, ensuring accurate and efficient results.

## Project Structure

- `/client`: Contains the React frontend code.
- `/server`: Houses the Node.js backend code.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/smart-task-summarizer.git
   cd smart-task-summarizer
   ```

2. **Setup the Server**:
   ```bash
   cd server
   npm install
   node server.js
   ```

3. **Setup the Client**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Running the Application

- The server will run on `http://localhost:3001`.
- The client will run on `http://localhost:5174`.

## API Integration

This project integrates with the DeepSeek API from OpenRouter to process tasks. Ensure you have a valid API key configured in the `.env` file in the server directory.

## Contact

For any questions or support, please contact [your-email@example.com].