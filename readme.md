# API Documentation (Postman Ready)

**Base URL**: `http://localhost:3000`

---

## 🔐 Authentication

### 1. Register User

**Endpoint**: `POST /signup`  
**Headers**:

- `Content-Type: application/json`

**Request Body (RAW - JSON)**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Success Response (201 Created):
{
  "msg": "User registered successfully 🎉"
}

Error Response (400 Bad Request):
{
  "error": "User already exists"
}

pm.test("Status code is 201", function() {
    pm.response.to.have.status(201);
});
pm.test("Success message exists", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.msg).to.eql("User registered successfully 🎉");
});

### 2. Login User

Endpoint: POST /login
Headers: Content-Type: application/json

Request Body (RAW - JSON):
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Success Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "msg": "Logged in successfully 🔓"
}

Postman Test Script:
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});
pm.test("Token exists", function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.token).to.be.a('string');
});
// Save token for protected routes
pm.environment.set("auth_token", pm.response.json().token);




🔒 Protected Routes

Required Header:

    Authorization: Bearer {{auth_token}} (Use Postman environment variable)

    Content-Type: application/json

1. Get Overview

Endpoint: GET /overview
Success Response (200 OK):
json

{
  "data": "Overview content here"
}

2. Get Staff List

Endpoint: GET /staffList
Success Response (200 OK):
{
  "staff": [
    { "id": 1, "name": "Dr. Smith" },
    { "id": 2, "name": "Nurse Jane" }
  ]
}

3. Add New Patient

Endpoint: POST /addNew
Request Body (RAW - JSON):
{
  "name": "New Patient",
  "condition": "Fever"
}

Success Response (201 Created):
{
  "msg": "Patient added successfully",
  "patientId": 123
}

❌ Error Responses
Status Code	Body Example	Description
400	{"error":"Invalid email format"}	Bad request
401	{"error":"Invalid token"}	Unauthorized
404	{"error":"Endpoint not found"}	Not Found
500	{"error":"Database connection failed"}	Server error
```
