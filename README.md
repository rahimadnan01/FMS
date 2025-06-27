# Farm Management System (FMS)

A modern, full-stack web application for managing poultry farm operations, built with React (Vite), Material UI, Node.js, and MongoDB.

## Features

- **Authentication & Authorization**

  - Secure login and registration for Admin and Staff roles
  - Role-based access: Only Admins can add, update, or delete data; Staff can view only
  - Protected routes and global login alert

- **Staff Management**

  - Add, view, and manage staff members (Admin only)
  - Staff registration with validation

- **Flock Management**

  - Add, view, update, and delete flocks (Admin only)
  - View flock details and statistics

- **Report Management**

  - Daily, Weekly, and Monthly reports for each flock
  - Add, view, update, and delete reports (Admin only)
  - Consistent, modern UI for all report pages

- **UI/UX**

  - Responsive, clean design with Material UI and custom CSS
  - Centered loaders, error messages, and info alerts
  - Navigation bar with role-based links
  - All actions and forms are validated and user-friendly

- **API Integration**
  - All data operations use secure REST APIs
  - Uses axios with credentials for authentication
  - Handles API errors and loading states gracefully

## Project Structure

```
client/
  src/
    components/      # Reusable UI components (forms, loaders, alerts)
    context/         # AuthProvider for global auth state
    hooks/           # Custom hooks (e.g., useFetch)
    layouts/         # Navbar and layout components
    pages/           # All main pages (Staff, Flocks, Reports, etc.)
    utils/           # Utility functions and assets
server/
  src/
    controllers/     # Express controllers for all resources
    middlewares/     # Auth, error handling, etc.
    models/          # Mongoose models
    routes/          # API routes
    utils/           # API helpers
```

## How It Works

- **Login Alert:**

  - If not logged in, a global alert blocks all activity and prompts the user to log in.
  - The alert is hidden on the login and register pages.

- **Role-Based Access:**

  - Only users with `role: "admin"` can add, update, or delete staff, flocks, or reports.
  - Staff users can only view data.
  - All restricted actions are disabled or hidden for non-admins.

- **Navigation:**

  - The Navbar provides quick access to all main pages.
  - Links and actions are shown/hidden based on user role.

- **Forms & Validation:**
  - All forms use `react-hook-form` for validation and error handling.
  - Loading spinners and error messages are shown during API calls.

## Getting Started

1. **Install dependencies:**
   - In both `client/` and `server/` folders, run:
     ```bash
     npm install
     ```
2. **Start the backend:**
   - In the `server/` folder:
     ```bash
     npm start
     ```
3. **Start the frontend:**
   - In the `client/` folder:
     ```bash
     npm run dev
     ```
4. **Open the app:**
   - Visit [http://localhost:5173/FMS](http://localhost:5173/FMS) in your browser.

## Technologies Used

- React (Vite)
- Material UI
- React Router
- React Hook Form
- Node.js & Express
- MongoDB & Mongoose
- Axios

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

**Enjoy managing your farm with FMS!**
