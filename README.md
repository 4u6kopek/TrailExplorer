# 🌲 **TrailExplorer**

### _Your Ultimate Hiking Adventure Companion_

[![Live Demo](https://img.shields.io/badge/Live_Demo-Firebase-orange?style=for-the-badge&logo=firebase)](https://trailexplorer-2a121.web.app)  
[![Backend Repo](https://img.shields.io/badge/Backend-GitHub-black?style=for-the-badge&logo=github)](https://github.com/4u6kopek/trail-explorer-backend)
[![Mobile-Friendly](https://img.shields.io/badge/Mobile-Friendly-4CAF50?style=for-the-badge&logo=smartphone)](https://trailexplorer-2a121.web.app)

---

## 🚀 **Overview**

**TrailExplorer** is a **React.js Single Page Application (SPA)** designed for outdoor enthusiasts to discover, share, and manage hiking trails. Built with modern web technologies, it features:

- **User authentication** (Firebase)
- **CRUD operations** for trail management
- **Responsive UI** with interactive components
- **Hosted on Firebase** with a **Node.js/MongoDB backend**

---

## ✨ **Key Features**

| Feature               | Description                           | Tech Used              |
| --------------------- | ------------------------------------- | ---------------------- |
| **Trail Catalog**     | Browse all hiking trails with filters | React, CSS Grid        |
| **Trail Details**     | View full trail info + save favorites | React Router           |
| **User Profiles**     | Track created/saved trails            | Context API            |
| **Leaderboard**       | Top trail contributors ranking        | MongoDB Aggregation    |
| **Responsive Design** | Works on all devices                  | Flexbox, Media Queries |

---

## 🖥️ **Pages & Functionality**

### **Public Pages** (No login required)

| Page            | Description                            |
| --------------- | -------------------------------------- |
| **Home**        | Featured trails + CTA to explore       |
| **Adventures**  | Full trail catalog with search/filters |
| **Leaderboard** | Top 10 users by trail contributions    |
| **About**       | Project mission and features           |

### **Private Pages** (User-only)

| Page              | Functionality                       |
| ----------------- | ----------------------------------- |
| **Profile**       | Manage your trails & saved hikes    |
| **Create Trail**  | Add new trails (with image URLs)    |
| **Edit Trail**    | Modify existing trails (owner-only) |
| **Trail Details** | Save/unsave trails + owner actions  |

---

## 🛠️ **Tech Stack**

### **Frontend**

- **React.js** (Vite)
- **React Router** (Protected routes)
- **Firebase Authentication**
- **Context API** (State management)
- **CSS Modules** + **React Icons**
- **Multi-Device Favicons** (Generated via Favicon Generator)
- **Firebase Hosting**

### **Backend**

- **Node.js**
- **MongoDB** (Atlas)
- **Vercel Hosting**
- **REST API** (CRUD endpoints)

---

## 🔥 **Why TrailExplorer Stands Out**

- **Sleek UI/UX**: Card-based design with smooth animations
- **Performance**: Optimized API calls + lazy loading
- **Security**: Route guards + Firebase auth validation
- **Extensibility**: Ready for future features (comments, maps)

---

## 🌐 **Deployment Links**

- **Frontend (Firebase)**: [https://trailexplorer-2a121.web.app](https://trailexplorer-2a121.web.app)
- **Backend (GitHub)**: [https://github.com/4u6kopek/trail-explorer-backend](https://github.com/4u6kopek/trail-explorer-backend)

---

## 🚧 **Future Roadmap**

- [ ] **Google Maps integration** for trail locations
- [ ] **Weather API** for trail conditions
- [ ] **File uploads** (Firebase Storage)
- [ ] **Social features** (trail comments)

---

## 💻 **Local Setup**

1. Clone repos:
   ```bash
   git clone https://github.com/4u6kopek/TrailExplorer.git
   git clone https://github.com/4u6kopek/trail-explorer-backend.git
   ```
2. Install dependencies:
   ```bash
   cd trail-explorer && npm install
   cd ../trail-explorer-backend && npm install
   ```
3. Configure `.env` files (Firebase + MongoDB keys)
4. Run:
   ```bash
   npm run dev  # Frontend
   npm start    # Backend
   ```

---

## 📜 **License**

MIT © [Bogomil Dimitrov]

---

🌟 **Happy Hiking!** Share your adventures with #TrailExplorer.
