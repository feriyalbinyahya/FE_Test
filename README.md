# 🚦 Traffic Dashboard Frontend (Lalin POS)

A web application for managing **toll gate master data** and **daily traffic reports**, built using **React.js + Material UI (MUI)**. This app includes authentication, master data management, dynamic reporting, and data visualization with charts.


## ⚙️ Main Features

- **Login & Page Protection** (Private Route)
- **Dashboard Overview** with Traffic Charts per Method & Shift (Recharts)
- **Daily Traffic Reports** with Filtering, Sorting, and Pagination
- **Toll Gate Master Data Management** (Add / Edit / Delete)
- **Responsive Layout, Dynamic Modal Forms** using MUI Grid & Flexbox
- **Date Filtering** using Day.js and MUI Date Picker

---

## 🛠️ Tech Stack

- **Frontend**: React.js (CRA), MUI v5
- **Routing**: React Router v6
- **Charting**: Recharts
- **State**: useState, useEffect
- **Date Utility**: Day.js
- **Alert**: SweetAlert2
- **Token Handling**: Tokens are stored in localStorage to remain persistent when the browser is closed.
- **Auth Protected Routes**: Custom `PrivateRoute`

---

## 📂 Directory Structure
```bash
src/
├── assets/           # Static assets like images, icons, etc.
├── components/       # Reusable components like Navbar, Sidebar, Modals
├── layouts/          # Page layout structure
├── models/           # Data models or constants (if any)  
├── pages/            # Main route-level pages (Dashboard, Report, Gerbang)
├── routes/           # Route protection (e.g., PrivateRoute)
├── services/         # API service files (Axios calls)
├── styles/           # Custom CSS (if needed)
└── App.jsx           # Main entry and route setup
```

## 🔧 How to Run
```bash
# 1. Clone this repo
git clone https://github.com/username/traffic-lalin-pos-app.git
cd traffic-lalin-pos-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# The app will be available at http://localhost:3000
```