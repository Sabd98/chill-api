# Chill API Guidebook

Dokumentasi lengkap penggunaan API untuk aplikasi Chill (Video Streaming Service).

**Base URL**: `http://localhost:3000/api`
**Import api file**: `chill-api.postman_collection.json`

---


## 1. Authentication

Endpoint untuk manajemen akses user.

### Register User
Mendaftarkan pengguna baru.

*   **URL**: `/users/register`
*   **Method**: `POST`
*   **Auth**: Tidak perlu
*   **Body**:
    ```json
    {
      "username": "johndoe",
      "password": "secretpassword",
      "email": "johndoe@example.com",
      "fullname": "John Doe"
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "status": "success",
      "message": "User registered successfully",
      "data": {
        "id": "uuid-string",
        "username": "johndoe",
        "email": "johndoe@example.com",
        "fullname": "John Doe"
      }
    }
    ```

### Login User
Masuk dan mendapatkan token akses (JWT).

*   **URL**: `/users/login`
*   **Method**: `POST`
*   **Auth**: Tidak perlu
*   **Body**:
    ```json
    {
      "username": "johndoe",
      "password": "secretpassword"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Login successful",
      "data": {
        "token": "eyJh... (JWT Token)",
        "user": {
          "id": "uuid-string",
          "username": "johndoe"
        }
      }
    }
    ```
> **PENTING**: Simpan `token` yang didapat. Semua request di bawah ini **WAJIB** menyertakan header:
> `Authorization: Bearer <token_anda>`

---

## 2. User Profile

Endpoint untuk mengelola data profil pengguna.

### Get Profile
Mendapatkan data profil user yang sedang login.

*   **URL**: `/users/profile`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Profile retrieved successfully",
      "data": {
        "id": "uuid-string",
        "username": "johndoe",
        "created_at": "2024-..."
      }
    }
    ```

### Update Profile
Mengubah data profil user.

*   **URL**: `/users/profile`
*   **Method**: `PUT`
*   **Auth**: Bearer Token
*   **Body** (Kirim field yang ingin diubah saja):
    ```json
    {
      "username": "john_new",
      "avatar": "https://example.com/avatar.png"
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Profile updated successfully",
      "data": { ...data_user_terupdate }
    }
    ```

---

## 3. Movies (Film)

Endpoint untuk konten film.

### Get All Movies
Mendapatkan semua daftar film.
Mendukung filtering, sorting, dan searching via query params.

*   **URL**: `/movies`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Query Params (Postman)**:
    | Key | Value (Contoh) | Deskripsi |
    | :--- | :--- | :--- |
    | `search` | `Batman` | Cari judul film |
    | `genre` | `Action` | Filter berdasarkan genre |
    | `sortBy` | `title` | `title` atau `id` |
    | `sortOrder` | `ASC` | `ASC` atau `DESC` (Default: `ASC`) |
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Movies retrieved successfully",
      "data": [
        {
          "id": "uuid",
          "title": "Judul Film",
          "image_url": "...",
          "genres": ["Action", "Drama"]
        },
        ...
      ]
    }
    ```

### Get Movie Detail
Mendapatkan detail satu film.

*   **URL**: `/movies/:id`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Movie retrieved successfully",
      "data": {
        "id": "uuid",
        "title": "Judul Film",
        "genres": ["Action"],
        ...
      }
    }
    ```

---

## 4. Series (Serial TV)

Endpoint untuk konten serial TV.

### Get All Series
Mendapatkan semua daftar series.
Mendukung filtering, sorting, dan searching via query params.

*   **URL**: `/series`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Query Params (Postman)**:
    | Key | Value (Contoh) | Deskripsi |
    | :--- | :--- | :--- |
    | `search` | `Stranger` | Cari judul series |
    | `genre` | `Sci-Fi` | Filter berdasarkan genre |
    | `sortBy` | `title` | `title` atau `id` |
    | `sortOrder` | `ASC` | `ASC` atau `DESC` (Default: `ASC`) |
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Series retrieved successfully",
      "data": [
        {
          "id": "uuid",
          "title": "Judul Series",
          "genres": ["Comedy"]
        }
      ]
    }
    ```

### Get Series Detail (with Episodes)
Mendapatkan detail series beserta daftar episodenya.

*   **URL**: `/series/:id`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Series retrieved successfully",
      "data": {
        "id": "uuid",
        "title": "Judul Series",
        "genres": ["Comedy"],
        "episodes": [
          {
            "id": "uuid-ep",
            "title": "Episode 1",
            "ep_number": 1,
            "video_url": "..."
          },
          ...
        ]
      }
    }
    ```

---

## 5. My List (Daftar Saya)

Endpoint untuk mengelola daftar tontonan pribadi (Watchlist).

### Get My List
Melihat semua item di daftar saya.
Mendukung filtering, sorting, dan searching via query params.

*   **URL**: `/my-list`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Query Params (Postman)**:
    | Key | Value (Contoh) | Deskripsi |
    | :--- | :--- | :--- |
    | `search` | `Avenger` | Cari judul di My List |
    | `genre` | `Action` | Filter berdasarkan genre |
    | `sortBy` | `title` | `title` atau `id` |
    | `sortOrder` | `ASC` | `ASC` atau `DESC` (Default: `ASC`) |
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "My List retrieved successfully",
      "data": [
        {
          "my_list_id": "uuid",
          "movie_title": "Judul Film", 
          "series_title": null        
          ...
        }
      ]
    }
    ```

### Add to List
Menambahkan film atau series ke daftar saya.

*   **URL**: `/my-list`
*   **Method**: `POST`
*   **Auth**: Bearer Token
*   **Body**:
    ```json
    {
      "contentId": "uuid-film-atau-series",
      "type": "movie" 
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "status": "success",
      "message": "Added to My List successfully"
    }
    ```

### Remove from List
Menghapus item dari daftar saya.

*   **URL**: `/my-list`
*   **Method**: `DELETE`
*   **Auth**: Bearer Token
*   **Body**:
    ```json
    {
      "contentId": "uuid-film-atau-series",
      "type": "movie" 
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Removed from My List successfully"
    }
    ```

---

## 6. Subscription & Payment

Endpoint untuk berlangganan paket premium.

### Get Packages
Melihat daftar paket langganan yang tersedia.

*   **URL**: `/subscription/packages`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Packages retrieved successfully",
      "data": [
        {
          "id": 1,
          "name": "Premium",
          "price": 50000,
          "features": ["4K", "No Ads"]
        }
      ]
    }
    ```

### Get My Orders
Melihat daftar pesanan saya.

*   **URL**: `/subscription/orders`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Orders retrieved successfully",
      "data": [
        {
          "id": "order-uuid",
          "package_id": 1,
          "order_num": "ORD-123456789",
          "total_price": 50000,
          "status": "PENDING"
        },
        ...
      ]
    }
    ```

### Get Order Detail
Melihat detail pesanan berdasarkan ID.

*   **URL**: `/subscription/orders/:orderId`
*   **Method**: `GET`
*   **Auth**: Bearer Token
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Order retrieved successfully",
      "data": {
        "id": "order-uuid",
        "package_id": 1,
        "order_num": "ORD-123456789",
        "total_price": 50000,
        "status": "PENDING"
      }
    }
    ```

### Subscribe (Create Order)
Membuat pesanan paket baru (Status: PENDING).

*   **URL**: `/subscription/subscribe`
*   **Method**: `POST`
*   **Auth**: Bearer Token
*   **Body**:
    ```json
    {
      "packageId": 1
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "status": "success",
      "message": "Order created successfully",
      "data": {
        "id": "order-uuid",
        "status": "PENDING",
        "total_price": 50000
      }
    }
    ```

### Pay Order
Membayar pesanan (Simulasi Pembayaran).

*   **URL**: `/subscription/pay`
*   **Method**: `POST`
*   **Auth**: Bearer Token
*   **Body**:
    ```json
    {
      "orderId": "order-uuid-dari-step-subscribe",
      "paymentMethod": "GOPAY" 
    }
    ```
*   **Response (200 OK)**:
    ```json
    {
      "status": "success",
      "message": "Payment processed successfully",
      "data": {
        "paymentStatus": "SUCCESS"
      }
    }
    ```

### Cancel Order
Membatalkan pesanan yang belum dibayar.

*   **URL**: `/subscription/cancel`
*   **Method**: `POST`
*   **Auth**: Bearer Token
*   **Body**:
    ```json
    {
      "orderId": "order-uuid"
    }
    ```
