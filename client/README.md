# Milk Tracker PWA

This is a Progressive Web App (PWA) for tracking milk entries and managing users. The application interacts with a backend server to provide functionalities such as creating, updating, and deleting milk entries, as well as managing user information.

## Features

- User management: Create and view users.
- Milk entry management: Create, view, update, and delete milk entries.
- Dashboard: Overview of milk entries and user statistics.
- Responsive design: Works on both desktop and mobile devices.
- Offline capabilities: The app can function without an internet connection.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory:

   ```
   cd d:\Projects\Learning\milk-tracker\client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```
npm run build
```

The production files will be generated in the `dist` directory.

## API Endpoints

The application interacts with the following API endpoints:

### Users

- `GET /users`: Retrieve a list of users.
- `POST /users`: Create a new user.

### Milk Entries

- `GET /milk`: Retrieve a list of milk entries.
- `POST /milk`: Create a new milk entry.
- `GET /milk/:id`: Retrieve a specific milk entry by ID.
- `PUT /milk/:id`: Update a specific milk entry by ID.
- `DELETE /milk/:id`: Delete a specific milk entry by ID.

## License

This project is licensed under the MIT License. See the LICENSE file for details.