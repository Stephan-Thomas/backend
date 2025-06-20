POST /signup      → To register a new user
POST /login       → To authenticate user

Protected pages
GET  /overview    → overview page
GET  /settings    → settings page
GET  /staffList    → staff list page
GET  /calender    → calender page
GET  /patients    → patients page
GET  /addNew    → overview page

✅ Headers:
Content-Type: application/json


For protected routes:
Authorization: Bearer <token>

Body for /signup:
{
  "name": "John",
  "email": "john@example.com",
  "password": "yourpassword"
}

Body for /login:
{
  "email": "john@example.com",
  "password": "yourpassword"
}


## Base URL
 http://localhost:3000/

## Authentication
### Register a User
**Endpoint**: `POST /signup`  
**Headers**: `Content-Type: application/json`  
**Request Body**:
```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "yourpassword"
}
Response (success)
{
    "msg": "User registered successfully 🎉"
}

### Login a User
**Endpoint**: `POST /login`  
**Headers**: `Content-Type: application/json`  
**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
Response (success)
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE3ZDQzNzhhNzgxNmU0ZjY3YTJiNDUiLCJpYXQiOjE3NDYzOTIyNzIsImV4cCI6MTc0NjM5NTg3Mn0.IMrEZyeitwss5at4uuflnmSS18AzHGHUvuzzrNpjyrY",
    "msg": "Logged in successfully 🔓"
}


Error Codes
 
Code	Message	                Reason
400	    Bad Request	            Invalid input/missing data
401	    Unauthorized	        Invalid/expired token
500	    Internal Server Error	Server-side failure