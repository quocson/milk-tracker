# Milk Tracker

Milk Tracker is a full-stack application designed to help parents track baby feeding data. It consists of a React-based Progressive Web App (PWA) for the client-side and a Go-based backend server. The application supports offline functionality, user management, and feeding data visualization.

The client application, which supports offline mode, is hosted at: [https://quocson.github.io/milk-tracker/](https://quocson.github.io/milk-tracker/)

---

## Features

### Client (Frontend)
- **User-friendly Interface**: Built with React and TailwindCSS for a responsive and modern design.
- **Offline Support**: Uses IndexedDB for offline data storage and synchronization.
- **Data Visualization**: Weekly feeding reports with charts and summaries.
- **Progressive Web App (PWA)**: Installable on mobile and desktop devices.
- **Milk Entry Management**: Create, view and delete milk entries.
- **Settings**: Customize preferences like dark mode, notifications, and measurement units.

### Server (Backend)
- **RESTful API**: Built with the Gin framework for handling requests.
- **Database Integration**: Uses PostgreSQL with GORM for data persistence.
- **User Management**: Create and retrieve user data.
- **Milk Entry Management**: CRUD operations for feeding data.

---

## Project Structure

```
.github/
  workflows/
    deploy.yml          # GitHub Actions workflow for deployment
client/
  .eslintrc.json        # ESLint configuration
  .gitignore            # Git ignore rules
  index.css             # Global CSS styles
  index.html            # HTML entry point
  package.json          # Node.js dependencies and scripts
  tailwind.config.js    # TailwindCSS configuration
  tsconfig.json         # TypeScript configuration
  vite.config.ts        # Vite configuration
  public/               # Static assets (icons, manifest, etc.)
  src/                  # React application source code
server/
  .env                  # Environment variables
  go.mod                # Go module dependencies
  go.sum                # Go module checksums
  main.go               # Entry point for the Go server
  config/               # Database configuration
  controllers/          # API controllers
  models/               # Database models
  routes/               # API route definitions
  utils/                # Utility functions
```

---

## Getting Started

### Prerequisites

- **Frontend**: Node.js (version 14 or higher) and npm.
- **Backend**: Go (version 1.20 or higher) and PostgreSQL.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install
   ```

3. Navigate to the server directory and set up the backend:

   ```bash
   cd server
   go mod tidy
   ```

4. Configure the `.env` file in the `server` directory with your database connection details.

---

## Running the Application

### Client (Frontend)

To start the development server:

```bash
cd client
npm run start
```

The application will be available at `http://localhost:5137`.

To build for production:

```bash
npm run build
```

### Server (Backend)

To start the backend server:

```bash
cd server
go run main.go
```

The server will be available at `http://localhost:8080`.

---

## Deployment

The project includes a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) to deploy the frontend to GitHub Pages. To deploy:

1. Push changes to the `gh-pages-src` branch.
2. The workflow will build and deploy the frontend to the `gh-pages` branch.

---

## API Endpoints

### Users

- `GET /users`: Retrieve a list of users.
- `POST /users`: Create a new user.

### Milk Entries

- `GET /milk`: Retrieve a list of milk entries.
- `POST /milk`: Create a new milk entry.
- `GET /milk/:id`: Retrieve a specific milk entry by ID.
- `PUT /milk/:id`: Update a specific milk entry by ID.
- `DELETE /milk/:id`: Delete a specific milk entry by ID.

---

## Offline Support

The client utilizes IndexedDB to store milk entries locally, enabling offline mode without requiring a server connection.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
