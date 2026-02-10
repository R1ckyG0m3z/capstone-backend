# TrailKreweSer - Backend API

A comprehensive RESTful API backend for managing off-road trail adventures, user profiles, and trip planning for off-road enthusiasts.

## Description

TrailKreweSer Backend is a Node.js/Express application that powers a platform connecting off-road vehicle enthusiasts with curated trail experiences. The API handles user authentication, profile management, trail information, and trip planning features.

## Problem Statement

Off-road enthusiasts face challenges in discovering, planning, and tracking their trail adventures:

- Lack of centralized platform for trail information with detailed specifications (difficulty, terrain, length)
- No personalized profile system to showcase vehicles and experiences
- Difficulty coordinating and tracking planned trips with travel dates and status
- Limited ability to maintain a history of completed trails

TrailKreweSer Backend solves these problems by providing a robust API that enables users to explore trails, manage profiles, and organize their off-road adventures in one unified platform.

## Core Distinguishing Features

### 1. **Comprehensive Trail Management**

- Detailed trail information including difficulty ratings, terrain types, and length
- Multiple photo support for each trail (stored as PostgreSQL array)
- Estimated time and location data for trip planning
- Creator tracking for community-contributed trails

### 2. **Rich User Profile System**

- Customizable profiles with bio information
- Vehicle type tracking for enthusiasts
- Photo upload capability for profile personalization
- Automatic profile creation on first access

### 3. **Advanced Trip Planning**

- Many-to-many relationship between users and trips via junction table
- Trip status tracking (planned, in_progress, completed, cancelled)
- Travel date management with start/end dates
- Personal notes for each trip assignment

### 4. **Secure Authentication**

- JWT-based authentication with 7-day token expiration
- Bcrypt password hashing
- Protected routes requiring authentication
- Token verification middleware

### 5. **Robust Error Handling**

- PostgreSQL-specific error handling middleware
- Comprehensive validation on required fields
- Graceful cascading deletes for related data
- Centralized error responses

## Technology Stack

### Framework & Core

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database

### Security & Authentication

- **jsonwebtoken** - JWT token generation and verification
- **bcrypt** - Password hashing

### Middleware & Utilities

- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - HTTP request logger

### Development Tools

- **Vitest** - Testing framework
- **ES Modules** - Modern JavaScript module system

## Project Structure

```
capstone-backend/
│
├── api/                          # API route handlers
│   ├── trips.js                  # Trip endpoints (GET /trips, GET /trips/:id)
│   ├── users.js                  # Auth endpoints (POST /users/register, /login)
│   └── user_profile.js           # Profile & trip management endpoints
│
├── db/                           # Database layer
│   ├── client.js                 # PostgreSQL connection client
│   ├── schema.sql                # Database schema definitions
│   ├── seed.js                   # Database seeding script
│   └── queries/                  # Database query functions
│       ├── trips.js              # Trip-related queries
│       ├── users.js              # User authentication queries
│       └── user_profile.js       # Profile & user_trips queries
│
├── middleware/                   # Express middleware
│   ├── getUserFromToken.js       # Extracts user from JWT token
│   ├── handlePostgresErrors.js   # PostgreSQL error handler
│   ├── requireBody.js            # Request body validation
│   └── requireUser.js            # Authentication guard
│
├── utils/                        # Utility functions
│   └── jwt.js                    # JWT creation and verification
│
├── app.js                        # Express app configuration
├── server.js                     # Server entry point
├── package.json                  # Dependencies and scripts
└── vitest.config.js              # Test configuration
```

## Database Schema

### Tables

1. **users** - Authentication credentials
2. **user_profiles** - Extended user information (1:1 with users)
3. **trips** - Trail information and specifications
4. **user_trips** - Junction table linking users to trips with travel details

### Key Relationships

- `user_profiles.user_id` → `users.id` (1:1, CASCADE delete)
- `trips.created_by` → `users.id` (many:1, SET NULL on delete)
- `user_trips.user_profile_id` → `user_profiles.id` (many:many, CASCADE delete)
- `user_trips.trip_id` → `trips.id` (many:many, CASCADE delete)

## API Endpoints

### Authentication

- `POST /users/register` - Create new user account
- `POST /users/login` - Authenticate and receive JWT token

### Trips

- `GET /trips` - Get all available trails
- `GET /trips/:id` - Get specific trail details

### User Profile

- `GET /user_profile/:userId` - Get user profile (auto-creates if missing)
- `PUT /user_profile` - Update user profile information
- `POST /user_profile/assign-trip` - Add trip to user's planned trips
- `POST /user_profile/remove-trip` - Remove trip from user's trips
- `GET /user_profile/:userId/trips` - Get all user's trips with details

## Getting Started

### Prerequisites

- Node.js v22.0.0 or higher
- PostgreSQL database
- npm or equivalent package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables in `.env`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/trailkreweser
JWT_SECRET=your_secret_key_here
PORT=5000
```

3. Initialize database:

```bash
npm run db:schema
```

4. Seed database with sample data:

```bash
npm run db:seed
```

### Running the Application

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

**Run tests:**

```bash
npm test
```

## npm Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with file watching
- `npm test` - Run test suite
- `npm run db:schema` - Execute schema.sql to create tables
- `npm run db:seed` - Populate database with seed data
- `npm run db:reset` - Drop tables, recreate schema, and reseed

## Environment Variables

| Variable       | Description                      | Required |
| -------------- | -------------------------------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string     | Yes      |
| `JWT_SECRET`   | Secret key for JWT token signing | Yes      |
| `PORT`         | Server port (default: 5000)      | No       |

## Development Notes

- Uses ES Modules (`"type": "module"` in package.json)
- Import path aliases via `"imports"` field (`#api`, `#db`, `#middleware`, `#utils`)
- JWT tokens expire after 7 days
- Passwords are hashed with bcrypt before storage
- CORS enabled for cross-origin requests
- Automatic user profile creation on first access
