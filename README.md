# 🧪 OpenTrials Platform  
### *Dynamic Clinical Research Analytics Dashboard*

---

## ✨ What is this?

**OpenTrials** is not just another dashboard.

It’s a **self-adapting analytics system** that transforms **any CSV dataset** into a structured, interactive, and visually rich analytics experience — without predefined schemas.

> Upload data → Instantly get insights → No rigid structure → No breaking UI

Built with a strong focus on **real-world SaaS design**, **data intelligence**, and **delightful UI/UX**.

---

## 🎯 The Problem

Most dashboards today are fundamentally fragile:

- Require **fixed schemas** → break when data changes  
- Demand **manual configuration** → not scalable  
- Lack **flexibility for real-world datasets**

In real-world analytics (especially healthcare), data is:
- Messy  
- Inconsistent  
- Constantly evolving  

👉 Traditional dashboards fail here.

---

## 💡 The Solution

OpenTrials introduces a **dynamic analytics engine** that:

- Automatically **understands your dataset**
- Classifies columns into:
  - 📊 Numeric (e.g., BP, HR, Sleep)
  - 🧾 Categorical (e.g., Gender, Mood)
- Generates:
  - Statistical summaries  
  - Aggregations  
  - Distributions  

No schema. No config. Just data → insights.

---

## 🧠 Key Highlights

- ⚡ **Schema-less Architecture**  
- 📂 **Upload Any CSV**  
- 📊 **Auto-generated Analytics**  
- 🎯 **Adaptive Dashboard UI**  
- 🧩 **Modular Backend Design**  
- 🎨 **Clean, Animated Frontend Experience**

---

## 🖥️ Product Experience

The platform is designed with **user-first UI/UX principles**:

- Smooth transitions using **Framer Motion**
- Clean, modern layout with **Tailwind CSS**
- Responsive and intuitive dashboard
- Displays **only relevant data (no empty states)**

👉 Feels like a real SaaS product, not a college project.

---

## 🏗️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pandas

---

## ⚙️ Core Features

### ✅ CSV Upload System
- Upload **any dataset**
- No predefined format required
- Automatic parsing and validation

### ✅ Dynamic Analytics Engine
- Detects column types automatically
- Computes:
  - Mean, Min, Max (numeric)
  - Counts & distributions (categorical)

### ✅ Adaptive Dashboard
- UI adjusts based on available data
- Works across:
  - Clinical datasets  
  - Lifestyle tracking  
  - Research experiments  

### ✅ Participant-Level Insights
- Study-based data grouping
- Flexible structure for real-world usage

---

## 🔄 How It Works

1. User uploads CSV  
2. Backend:
   - Reads data using Pandas  
   - Infers schema dynamically  
   - Stores structured data  
3. Analytics engine computes insights  
4. Frontend renders dynamic dashboard  

---

## 🧪 Example Datasets

### Clinical Data
```
participant_id,gender,age,blood_pressure
1,Male,34,120
```

### Lifestyle Data
```
participant_id,sleep_hours,mood
1,7,Happy
```

👉 Both datasets work **without any code changes**

---

## 🧱 Project Structure

```
open-trials-platform/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── styles/
```

---

## 🧠 Design Decisions

### 1. Dynamic Schema Handling
Instead of rigid models:
- System reads CSV headers
- Builds structure dynamically

### 2. Separation of Concerns
- Ingestion logic  
- Analytics engine  
- UI rendering  

### 3. Scalable Thinking
Designed to evolve into:
- Multi-tenant SaaS  
- Real-time analytics  
- AI-powered insights  

---

## 🚧 Challenges Solved

- Handling **unknown CSV structures**
- Preventing **UI breakage**
- Dynamic frontend rendering
- Backend ↔ frontend synchronization

---

## 📈 Future Improvements

- 📊 Auto chart generation for all metrics  
- 🔍 Advanced filtering & search  
- 📥 Export analytics  
- 🤖 AI-driven insights  
- 🔐 Authentication & multi-user support  

---

## 👨‍💻 About Me

**Aryan Lodha**  
MSc Data Science @ University of Bristol  
Full Stack Developer | UI/UX Enthusiast  

- Strong focus on **scalable systems**
- Passionate about **building real-world products**
- Experience in **end-to-end development**

---

## ⭐ Final Note

This project is not just a dashboard.

It’s a **foundation for a real-world analytics platform** — built with:
- Product thinking  
- Engineering depth  
- User-centric design  

---

### 👀 If you're a recruiter:

This project demonstrates:

- ✅ Full-stack engineering  
- ✅ Data engineering + analytics  
- ✅ Scalable system design  
- ✅ Strong UI/UX thinking  

---

**Thanks for checking it out 🙌**
