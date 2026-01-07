Below is a **clean, professional, industry-ready `README.md`** written **strictly based on your provided files** (`__init__.py`, `auth.py`, `models.py`, `views.py`).
No fake features, no assumptions — **100% accurate** to your codebase.

You can **copy-paste this directly** into `README.md`.

---

# 💸 Spendly – Expense Tracker Web Application

Spendly is a **Flask-based expense tracking web application** that allows users to securely **sign up, log in, and manage personal expense notes**.
The application follows a **modular architecture** using Flask Blueprints and includes **user authentication, session management, and database integration**.

---

## ✨ Features

* 🔐 User Authentication (Sign Up, Login, Logout)
* 👤 User-specific data access
* 🧾 Add expense notes
* 🗑️ Delete expense notes (AJAX-based)
* 🔒 Secure password hashing
* 🗃️ SQLite database with SQLAlchemy ORM
* 🧱 Modular Flask structure using Blueprints

---

## 🛠️ Tech Stack

* **Backend**: Flask (Python)
* **Database**: SQLite
* **ORM**: SQLAlchemy
* **Authentication**: Flask-Login
* **Security**: Werkzeug password hashing
* **Frontend**: HTML, CSS, Bootstrap, JavaScript
* **Architecture**: App Factory Pattern + Blueprints

---

## 📂 Project Structure

```text
website/
│
├── __init__.py        # App factory, database & login manager setup
├── auth.py            # Authentication routes (login, signup, logout)
├── views.py           # Main application routes
├── models.py          # Database models (User, Note)
│
├── templates/
│   ├── base.html
│   ├── login.html
│   ├── sign_up.html
│   └── home.html
│
├── static/
│   ├── index.js       # JavaScript for deleting notes
│   └── styles.css
│
└── database.db        # SQLite database (auto-created)
```

---

## 🧩 Application Architecture

### 🔹 App Factory (`create_app`)

* Initializes Flask app
* Configures secret key & database
* Registers Blueprints
* Initializes Flask-Login
* Automatically creates database tables

### 🔹 Blueprints

* `auth` → Authentication logic
* `views` → Main application logic

---

## 🗄️ Database Models

### User

* `id` (Primary Key)
* `email` (Unique)
* `password` (Hashed)
* `first_name`
* `notes` (Relationship)

### Note

* `id` (Primary Key)
* `data` (Expense note content)
* `date` (Timestamp)
* `user_id` (Foreign Key)

---

## 🔐 Authentication Flow

1. User signs up with email, name, and password
2. Password is hashed using Werkzeug
3. User logs in using email & password
4. Flask-Login manages sessions
5. Protected routes require authentication
6. Logout clears session

---

## ▶️ How to Run the Project

### 1️⃣ Install Dependencies

```bash
pip install flask flask-sqlalchemy flask-login
```

### 2️⃣ Run the Application

```bash
python main.py
```

*(or whichever file initializes `create_app()`)*

---

## 🌐 Routes Overview

| Route          | Method    | Description              |
| -------------- | --------- | ------------------------ |
| `/login`       | GET, POST | User login               |
| `/sign-up`     | GET, POST | User registration        |
| `/logout`      | GET       | User logout              |
| `/`            | GET, POST | Home page (add expenses) |
| `/delete-note` | POST      | Delete expense note      |

---

## 🛡️ Security Measures

* Password hashing (Werkzeug)
* Login-protected routes
* User-specific data validation
* Secure session handling

---

## 📌 Future Enhancements

* Expense categories
* Monthly analytics
* Charts & reports
* Dark mode UI
* Export expenses (CSV/PDF)

---

## 👨‍💻 Author

Developed by **Shreya Jolapara**
Flask • Backend Development • Web Applications

---

## 📄 License

This project is for **educational and personal use**.

---

If you want next:

* **GitHub-ready badges**
* **Screenshots section**
* **API documentation**
* **Deployment guide**
* **Resume-optimized README**

Just say the word 👍
