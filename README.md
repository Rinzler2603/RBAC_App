# React Authentication Application

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with user authentication, role-based access, and resource management. It includes functionalities like user registration, login, and profile management, as well as the ability to add, edit, and delete resources.

---

## Features

- **User Authentication:**
  - Register users with email, username, and password.
  - Login functionality with token-based authentication (JWT).
  - Password validation requiring at least 8 characters, one uppercase letter, and one special character.

- **Role-Based Access:**
  - Normal users can manage their own resources.
  - Admin users have additional privileges to delete any resource.

- **Resource Management:**
  - Add, edit, and delete resources.
  - Display resources dynamically.

- **Responsive UI:**
  - Styled using Bootstrap and Google Fonts.
  - Dark theme with a black background and white text.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the `frontend` folder and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` folder with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

---

## File Structure

### Backend
- `server.js`: Entry point for the backend.
- `routes/`:
  - `auth.js`: Authentication routes.
  - `resources.js`: Resource management routes.
- `models/`:
  - `User.js`: User schema.
  - `Resource.js`: Resource schema.

### Frontend
- `src/`:
  - `components/`:
    - `Login.js`: Login page.
    - `Register.js`: Register page.
    - `Profile.js`: Profile page.
    - `Resources.js`: Resource management page.
  - `App.js`: Main React app component.

---

## Usage

1. **Register a User:**
   - Navigate to the registration page and create a new user.
   - Users are automatically redirected to their profile upon successful registration.

2. **Login:**
   - Login with registered credentials.
   - Upon successful login, users are redirected to their profile page.

3. **Manage Resources:**
   - Navigate to the resources page to add, edit, or delete resources.
   - Admin users can delete any resource.

4. **Navigate Between Pages:**
   - Buttons are provided to navigate between login, registration, profile, and resources pages.

---

## Technologies Used

- **Frontend:** React, React Router, Bootstrap, Google Fonts.
- **Backend:** Node.js, Express.js, MongoDB.
- **Authentication:** JWT (JSON Web Tokens).



