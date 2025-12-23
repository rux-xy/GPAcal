# GPAcal 📊

**GPAcal** is a web-based GPA tracking and analysis application designed for university students.  
It allows users to manage course details semester-wise, calculate GPA accurately, and visualize academic performance using interactive charts.

The project is built with **React, TypeScript, Firebase**, and **Recharts**, focusing on clean architecture, data consistency, and real-world usability.

---

## ✨ Features

### 🔐 Authentication
- Email & Password authentication
- Google Sign-In via Firebase
- Protected routes for authenticated users

### 📚 Course Management
- Add, edit, and delete courses
- Semester-wise course organization
- Automatic subject detection from course codes (e.g., `COSC`, `STAT`, `PMAT`)
- Persistent storage using Firebase Firestore

### 📈 GPA Calculation
- Overall GPA calculation
- Semester-wise GPA calculation
- Subject-wise GPA analysis
- Handles edge cases (empty semesters, no courses)

### 📊 Analytics & Visualizations
- GPA trend over semesters
- GPA distribution by subject
- Course distribution pie chart
- Live updates based on stored data

### ⚙️ Settings
- User account management
- Secure sign-out

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts**
- **Lucide Icons**

### Backend / Services
- **Firebase Authentication**
- **Firebase Firestore**

### Tooling
- **Vite**
- **ESLint**
- **Git & GitHub**

---

## 📂 Project Structure

```

src/
├── components/        # Reusable UI components
│   ├── CourseTable.tsx
│   ├── GPACard.tsx
│   ├── GPAChart.tsx
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
│
├── pages/             # Application pages
│   ├── Dashboard.tsx
│   ├── Courses.tsx
│   ├── Analysis.tsx
│   ├── Graphs.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Settings.tsx
│
├── context/           # Global state
│   └── AuthContext.tsx
│
├── lib/               # Firebase & services
│   ├── firebase.ts
│   └── courseService.ts
│
├── utils/             # Business logic
│   ├── gpaCalculator.ts
│   └── courseParser.ts
│
├── App.tsx
├── main.tsx
└── index.css

```

---

## 🔑 GPA Logic

- GPA is calculated using **credit-weighted averages**
- Subject is automatically inferred from course code
- Calculations are shared across Dashboard, Analysis, and Graphs to ensure consistency

---

## 🔥 Firebase Data Model

```

users/{uid}
├── profile
│   ├── name
│   └── email
└── courses/{courseId}
├── code
├── name
├── credits
├── grade
├── semester
├── subject
└── level

````

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/GPAcal.git
cd GPAcal
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup Firebase

* Create a Firebase project
* Enable **Authentication** (Email + Google)
* Enable **Firestore**
* Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the app

```bash
npm run dev
```

---

## 🧪 Current Status

* ✅ Core functionality complete
* ✅ Firestore integration stable
* ✅ Authentication implemented
* ✅ UI functional and responsive

---

## 📌 Future Improvements

* Editable grading scale
* Export GPA reports (PDF/CSV)
* Multi-year academic tracking
* Dark mode
* Mobile-first optimizations

---

## 👤 Author

**Rumeth Wijethunge**
Undergraduate – University of Kelaniya
Department of Statistics & Computer Science

---

## 📜 License

This project is for educational and personal use.

```
