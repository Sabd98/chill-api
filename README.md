# Chill API

Backend API for Chill Application (Video Streaming Service).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (using `mysql2` with raw queries)
- **Authentication**: JWT (JSON Web Token)
- **Logging**: Morgan

## Project Structure

The project follows a layered architecture (MVC):

- `config/`: Database configuration
- `models/`: Database interactions (Raw SQL Queries)
- `services/`: Business logic
- `controllers/`: Request/Response handling
- `routes/`: API route definitions
- `middlewares/`: Custom middlewares (Auth, Logger)
- `utils/`: Helper functions (Response formatting)

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the root directory (already created):
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    JWT_SECRET=supersecretkey
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_app_password
    BASE_URL=http://localhost:3000
    ```

3.  **Database Migration**
    Import the SQL file located in `migration/` to your MySQL database.
     Pastikan urutan import benar untuk menghindari error Foreign Key (FK):

    **Urutan Import (Saran):**
    1.  `chill_app_user.sql` (Tabel User)
    2.  `chill_app_genre.sql` (Master Genre)
    3.  `chill_app_package.sql` (Master Package)
    4.  `chill_app_movies.sql` (Data Movies)
    5.  `chill_app_series.sql` (Data Series)
    6.  `chill_app_episodes.sql` (Data Episodes - FK ke Series)
    7.  `chill_app_movie_genres.sql` (Relasi Movie-Genre)
    8.  `chill_app_series_genres.sql` (Relasi Series-Genre)
    9.  `chill_app_my_list.sql` (Relasi User-Content)
    10. `chill_app_order.sql` (Transaksi Order)
    11. `chill_app_payment.sql` (Data Payment)

    **Cara Import via Terminal:**
    ```bash
    # Masuk ke folder migration
    cd migration

    # Import satu per satu (contoh)
    mysql -u root -p chill_db < chill_app_user.sql
    mysql -u root -p chill_db < chill_app_genre.sql
    # ... lanjutkan sesuai urutan
    ```
    *Atau gunakan tools GUI seperti DBeaver/HeidiSQL/phpMyAdmin untuk import file-file tersebut.*

4.  **Run the Server**
    ```bash
    npm start
    ```

## API Endpoints

### Auth & Users
- `POST /api/register` - Register a new user (with email verification)
- `GET /api/verify-email` - Verify user email
- `POST /api/login` - Login with email and password
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update user profile (Protected)

### Movies (Protected)
- `GET /api/movies` - Get all movies (supports query params: `search`, `genre`, `sortBy`)
- `GET /api/movies/:id` - Get movie details

### Series (Protected)
- `GET /api/series` - Get all series (supports query params: `search`, `genre`, `sortBy`)
- `GET /api/series/:id` - Get series details (with episodes)

### My List (Protected)
- `GET /api/my-list` - Get user's my list (supports query params: `search`, `genre`, `sortBy`)
- `POST /api/my-list` - Add a movie/series to my list
- `DELETE /api/my-list` - Remove a movie/series from my list

### Subscription (Protected)
- `GET /api/subscription/packages` - Get subscription packages
- `GET /api/subscription/orders` - Get user's orders
- `GET /api/subscription/orders/:orderId` - Get order details
- `POST /api/subscription/subscribe` - Create a new subscription order
- `POST /api/subscription/pay` - Pay for a subscription
- `POST /api/subscription/cancel` - Cancel a subscription order

## Implementation Details

- **Raw Queries**: All database interactions use raw SQL queries via `mysql2` pool.
- **Authentication**: Routes under `/api/movies` are protected by `authMiddleware` which verifies the JWT token.
