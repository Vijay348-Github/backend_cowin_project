# backend_cowin_project

## Description

This API facilitates vaccine registration, slot booking, and administration for a specific duration.

## Features
- User registration and login
- View available vaccine slots
- Register for vaccine slots
- Update registered vaccine slots
- Admin functionalities: check total users, filter users, check vaccine slots

## Tech Stack
- Node.js
- Express.js
- MongoDB

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account

# API endpoints

POST /user/register - User registration
POST /user/login - User login
GET /user/slots - View available vaccine slots
POST /user/register-slot - Register for a vaccine slot
PUT /user/update-slot/:userId - Update registered vaccine slot for a user
(Admin) GET /admin/users - Check total users and filter them
(Admin) GET /admin/slots - Check vaccine slots for a given day


# For User:

User registration: /user/register
User login: /user/login
View available time slots: /user/slots
Register for a vaccine dose: /user/register-slot
Update registered slot: /user/update-slot/:userId

# For Admin:

Admin login: /admin/login
Get total users with optional filters: /admin/total-users
Get total slots: /admin/total-slots
Get slot details: /admin/slot/:slotId
Adding a slot: /admin/add-slot

# Models

## User

### Fields

- **name**: String (required)
- **phoneNumber**: String (required, unique)
- **age**: Number (required)
- **pincode**: Number (required)
- **aadharNo**: String (required)
- **password**: String (required)
- **firstDoseStatus**: String (enum: ["none", "completed"], default: "none")
- **secondDoseStatus**: String (enum: ["none", "completed"], default: "none")

## Slot

### Fields

- **date**: Date (required)
- **startTime**: String (required)
- **endTime**: String (required)
- **availableDoses**: Number (required)


## Environment Variables

- `MONGODB_URI`: mongodb+srv://vijayramesh4321:wBgyCG0SkAVcq8fK@assignment.3zz4xbk.mongodb.net/project

## Setting Up Locally

- Clone the repository.
- Install dependencies (`npm install`).
- Set up environment variables.
- Run the application (`node App.js`).
