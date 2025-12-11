# 📄 User Document Management System

A full-stack system for uploading, assigning, emailing, and downloading PDF documents for selected users.
Supports per-user PDF assignment, ZIP download generation, and email delivery.

# 🚀 Features

🔐 User Management  
📤 PDF Assignment  
📥 ZIP Download  
✉ Email Notifications

# 🖥 How to Use

1.Uplod CSV  
2.List users  
3.Upload or pick a PDF  
4.Select users for assignment  
5.Assign PDF  
6.Download ZIP

Automatically clears selection after assignment

# 🛠 Tech Stack

MERN Stack


# 📁 Project Structure


```Backend
/backend
  /controllers
    pdfController.js
    userController.js
  /models
    User.js
  /routes
    pdfRoutes.js
    userRoutes.js
  /uploads
    (PDF files)
  server.js

Frontend
/frontend
  /src
    components/
      AssignPDF.jsx
    pages/
      UserList.jsx
    api.js
```

# 🔧 Installation & Setup

1. Clone repository
```
git clone https://github.com/KartikYadav7/User-Document-Management-System.git
cd document-system
```

🖥 Backend Setup   

2. Install dependencies
cd backend
```
npm install
```

3. Configure environment variables

Create .env:
```
MONGO_URI=mongodb://localhost:27017/docsystem
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
```

4. Run backend
```
npm start
```

💻 Frontend Setup
1. Install dependencies 
```
cd frontend
npm install
```
3. Configure API URL

In api.js:  

```export default axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout:60000,
});
```

3. Run frontend
```
npm start
```

# 📌 Key Advantages

✔ Assign PDFs quickly  
✔ Email delivery integrated  
✔ ZIP downloads for bulk export  
✔ No temp files → fast & safe  
✔ Clean React interface  
✔ MongoDB persistence  

# 🧩 Future Improvements

✔User roles (Admin / Viewer)  
✔PDF preview before sending  
✔Upload multiple PDFs  
✔Activity log for assignments   
✔Pagination & search  

# 📜 License

MIT License
