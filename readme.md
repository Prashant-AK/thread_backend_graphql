# Threads App Backend

## Overview

The Threads App Backend is a Node.js application built with TypeScript and Apollo Server for handling GraphQL requests. It connects to a PostgreSQL database and provides a simple API to interact with.

## Features

- GraphQL API for querying data
- PostgreSQL database integration
- CORS support
- Environment variable management using dotenv
- Development and production scripts

## Technologies Used

- Node.js
- TypeScript
- Apollo Server
- Express
- PostgreSQL
- Docker

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker (for database setup)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/threads-app-backend.git
   cd threads-app-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```
   PORT=8000
   ```

4. Start the PostgreSQL database using Docker:

   ```bash
   docker-compose up -d
   ```

5. Start the application:

   For development mode (with auto-reload):

   ```bash
   npm run dev
   ```

   For production mode:

   ```bash
   npm start
   ```

### API Endpoints

- **GET /**: Returns a simple "Hello World!" message.
- **POST /graphql**: GraphQL endpoint for queries and mutations.

### Example Query

To test the GraphQL API, you can use the following query:

```graphql
{
  hello
}
```

### Running Tests

Currently, there are no tests implemented. You can add your tests in the future.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
