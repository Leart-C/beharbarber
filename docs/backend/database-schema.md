# Database Schema

## Responsibilities

- Clerk manages authentication and user sessions.
- Neon stores application and business data.
- The backend verifies Clerk tokens before accessing Neon.
- The Expo application never connects directly to Neon.

## Tables

### users

Represents an application user linked to Clerk.

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| clerk_user_id | text | Unique, required |
| display_name | text | Required |
| role | text | `customer`, `barber`, or `admin` |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

Do not use the Clerk ID as our database primary key. Store it as a unique external identity.

### service_categories

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| name | text | Required |
| slug | text | Unique, required |
| sort_order | integer | Required |
| active | boolean | Default true |

Examples: `haircut`, `shave`, `styling`.

### services

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| category_id | uuid | References service_categories |
| name | text | Required |
| duration_minutes | integer | Must be greater than 0 |
| price_cents | integer | Must be 0 or greater |
| currency | char(3) | Default `EUR` |
| active | boolean | Default true |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

Prices are stored as integer cents. For example, €6 is stored as `600`. This avoids floating-point money errors.

### appointments

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| customer_id | uuid | References users |
| barber_id | uuid | References users |
| service_id | uuid | References services |
| service_name | text | Snapshot at booking time |
| duration_minutes | integer | Snapshot at booking time |
| price_cents | integer | Snapshot at booking time |
| currency | char(3) | Snapshot at booking time |
| starts_at | timestamptz | Required |
| ends_at | timestamptz | Required |
| status | text | See statuses below |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

Appointment statuses:

- `confirmed`
- `cancelled`
- `completed`
- `no_show`

The service name, duration, and price are copied into the appointment. If the barber changes a service later, historical bookings remain accurate.

Appointments for the same barber must not overlap when their status is `confirmed`.

### working_hours

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| barber_id | uuid | References users |
| weekday | integer | 0–6 |
| opens_at | time | Required |
| closes_at | time | Required |
| active | boolean | Default true |

### blocked_times

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| barber_id | uuid | References users |
| starts_at | timestamptz | Required |
| ends_at | timestamptz | Required |
| reason | text | Optional |
| created_at | timestamptz | Required |

This handles holidays, breaks, personal time, and early closing.

### announcements

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| message_sq | text | Required |
| message_en | text | Optional |
| active | boolean | Default true |
| starts_at | timestamptz | Optional |
| ends_at | timestamptz | Optional |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

## Important database rules

- A customer can only read their appointments.
- Admins can manage all appointments.
- Appointment availability is always calculated by the backend.
- The mobile app cannot decide whether a time is available.
- The backend determines service price, duration, and appointment end time.
- Confirmed appointments for the same barber cannot overlap.