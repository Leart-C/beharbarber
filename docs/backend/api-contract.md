# API Contract

## Authentication

Authenticated requests include a Clerk session token:

Authorization: Bearer <clerk-token>

The backend verifies this token and reads the Clerk user ID.

The client must never send a user ID and ask the server to trust it.

## Customer endpoints

### GET /v1/services

Returns active categories and services.

### GET /v1/availability

Query parameters:

- serviceId
- date

Example:

GET /v1/availability?serviceId=service-id&date=2026-08-05

Response:

{
  "date": "2026-08-05",
  "timeSlots": [
    {
      "startsAt": "2026-08-05T09:00:00+02:00",
      "available": true
    }
  ]
}

### GET /v1/appointments

Returns appointments belonging to the signed-in customer.

The customer ID comes from the verified Clerk token.

### POST /v1/appointments

Request:

{
  "serviceId": "service-id",
  "startsAt": "2026-08-05T09:00:00+02:00"
}

The client does not send:

- price
- duration
- customer ID
- end time
- availability

The backend calculates and validates those values.

Responses:

- 201: appointment created
- 400: invalid request
- 401: not authenticated
- 404: service not found
- 409: time is no longer available

### PATCH /v1/appointments/:appointmentId/cancel

Cancels an appointment without deleting its historical record.

A customer may only cancel their own appointment.

## Public endpoints

### GET /v1/announcements/current

Returns the currently active barber announcement.

## Admin endpoints

### GET /v1/admin/appointments

Returns appointments for the admin dashboard.

### POST /v1/admin/services

Creates a service.

### PATCH /v1/admin/services/:serviceId

Updates a service.

### PATCH /v1/admin/appointments/:appointmentId

Updates appointment status or schedule.

### POST /v1/admin/blocked-times

Blocks time from being booked.

### POST /v1/admin/announcements

Creates or updates the current announcement.

## Security rules

- All admin endpoints verify the user has the admin or barber role.
- The Neon connection string exists only on the server.
- The backend validates every request.
- The backend checks availability again inside the booking operation.
- Client-provided prices and durations are never trusted.