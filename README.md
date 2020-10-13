# Udemy - The Complete Node.js Developer by Andrew Mead, Task Manager App

A simple task manager REST API

## Required Environment variables
- within the config directory, define: `dev.env`, `prod.env`, and `test.env`
- Those files need to define:
  - `PORT` - the port this app should use
  - `JWT_SECRET` - the key used for signing JWT tokens
  - `MONGODB_URL` - the URL to a running MongoDB instance
  - `SENDGRID_API_KEY` - the API key used in a SendGrid App
