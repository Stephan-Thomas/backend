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
