# Jobbee API Documentation

## Introduction

### Overview
Jobbee API is a Node.js-based RESTful API for job listings. It provides CRUD operations for job postings, user authentication, and geolocation-based job search.

### Purpose and Key Features
- Create, read, update, and delete job listings.
- Search for jobs within a specified radius.
- User authentication and role-based access control.
- Advanced error handling for development and production environments.

### Target Users and Use Cases
- Job seekers looking for job listings.
- Employers posting job vacancies.
- Admins managing job listings and users.

## Architecture Overview

### Tech Stack
- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Nodemailer**: For sending emails.

### API Design Principles
- RESTful API design.
- Monolithic architecture.

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm (Node Package Manager)

### Step-by-Step Guide
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/jobbee-api.git
   cd jobbee-api

2. Install dependencies:
npm install


3. Set up environment variables: Create a .env file in the config directory and add the following:
PORT=7777
NODE_ENV=development
DB_LOCAL_URI=mongodb://localhost:27017/jobs
GEOCODER_PROVIDER=mapquest
GEOCODER_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_EMAIL=noreply@jobbee.com
SMTP_FROM_NAME=Jobbee


4. Run the project:
npm run dev


API Endpoints
Jobs
GET /api/v1/jobs: Get all jobs.
POST /api/v1/job/new: Create a new job.
PUT /api/v1/job/:id: Update a job.
DELETE /api/v1/job/:id: Delete a job.
GET /api/v1/jobs/:zipcode/:distance: Search jobs within a radius.
Users
GET /api/v1/me: Get current user profile.
PUT /api/v1/password/update: Update user password.
PUT /api/v1/me/update: Update user data.
DELETE /api/v1/me/delete: Delete user account.
Authentication
POST /api/v1/register: Register a new user.
POST /api/v1/login: Login user.
POST /api/v1/password/forgot: Forgot password.
PUT /api/v1/password/reset/:token: Reset password.
GET /api/v1/logout: Logout user.


Example Requests and Responses
// Example request for creating a job
POST /api/v1/job/new
{
  "title": "Software Engineer",
  "description": "Job description here",
  "email": "example@example.com",
  "address": "123 Main St",
  "company": "Tech Corp",
  "industry": ["Information Technology"],
  "jobType": "Permanent",
  "minEducation": "Bachelors",
  "positions": 1,
  "experience": "1 Year - 2 Years",
  "salary": 60000
}

// Example response
{
  "success": true,
  "message": "Job Created.",
  "data": {
    "_id": "60c72b2f9b1d4c1f8c8b4567",
    "title": "Software Engineer",
    "description": "Job description here",
    "email": "example@example.com",
    "address": "123 Main St",
    "company": "Tech Corp",
    "industry": ["Information Technology"],
    "jobType": "Permanent",
    "minEducation": "Bachelors",
    "positions": 1,
    "experience": "1 Year - 2 Years",
    "salary": 60000,
    "postingDate": "2021-06-14T10:00:00.000Z",
    "lastDate": "2021-06-21T10:00:00.000Z",
    "user": "60c72b2f9b1d4c1f8c8b4566"
  }
}

JWT Authentication
JWT tokens are used for user authentication.
Tokens are generated using the jsonwebtoken library.
Role-Based Access Control (RBAC)
Roles: user, employeer, admin.
Middleware functions to check user roles and permissions.
Security Best Practices
CORS enabled.
Input validation using validator.
Rate limiting can be implemented using express-rate-limit.
Database Design
Schema Overview
Job: Job listings with fields like title, description, email, address, etc.
User: User details with fields like name, email, password, role, etc.
Relationships and Indexing
Jobs are linked to users via user field.
Indexing on fields like location for geospatial queries.
Testing & Automation
Testing Strategy
Unit and integration tests using Jest and Supertest.
Test cases for all API endpoints.

Example Test Case

const request = require('supertest');
const app = require('../app');

describe('GET /api/v1/jobs', () => {
  it('should return all jobs', async () => {
    const res = await request(app).get('/api/v1/jobs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});

Deployment Guide

CI/CD Pipeline
GitHub Actions for continuous integration.
Deployment to cloud platforms like Heroku.
Deployment Steps
Set up GitHub Actions workflow.
Deploy to Heroku using the Heroku CLI.
Error Handling & Logging
Standardized Error Responses
Custom error handler middleware for consistent error responses.
Logging Mechanisms
Logging using winston or pino.
Contributing Guidelines
Coding Standards
Follow the Airbnb JavaScript style guide.
Use ESLint for code linting.
Pull Request Workflow
Fork the repository.
Create a new branch for your feature or bugfix.
Submit a pull request for review.