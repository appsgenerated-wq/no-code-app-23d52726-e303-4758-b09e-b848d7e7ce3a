# FoodieFind - Food App

This is a complete full-stack application built with React and Manifest. It serves as a platform for users to discover restaurants and for restaurant owners to manage their establishment's information and menu.

## Tech Stack

- **Backend**: Manifest (YAML-based backend-as-a-service)
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Features

- **User Authentication**: Secure sign-up and login for customers and restaurant owners.
- **Role-Based Access**: A 'customer' role for browsing and an 'owner' role for managing.
- **Restaurant Management**: Owners can create their restaurant profile, including name, description, address, and a cover image.
- **Menu Management**: Owners can add, view, update, and delete menu items for their restaurant.
- **Public Restaurant Directory**: All users can browse a list of all restaurants on the platform.
- **Automatic Admin Panel**: A complete admin dashboard provided by Manifest for data management.

## Getting Started

1.  **Clone the repository.**
2.  **Install dependencies**: `npm install`
3.  **Run the development server**: `npm run dev`
4.  The application will be available at `http://localhost:5173`.
5.  Access the **Manifest Admin Panel** via the link in the application header to manage data directly. Default credentials are `admin@manifest.build` / `admin`.