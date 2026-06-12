# Hanni Store (Frontend)

โปรเจกต์ React + TypeScript สำหรับระบบร้านค้าออนไลน์ Hanni Store 
พัฒนาด้วย Vite เพื่อความรวดเร็ว โครงสร้างโปรเจกต์ถูกออกแบบมาให้รองรับการสเกล (Scalable) และง่ายต่อการทำงานเป็นทีม

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Styling:** Vanilla CSS (เน้นความมินิมอลและปรับแต่งง่าย)
- **Icons:** Lucide React

## 📁 Project Structure (โครงสร้างโปรเจกต์)
เราใช้สถาปัตยกรรมแบบแยกหน้าที่ชัดเจน (Separation of Concerns):

```text
src/
├── components/      # แหล่งรวม UI Component ที่ใช้ซ้ำได้ (ปุ่ม, ฟอร์ม, Navbar)
├── constants/       # ค่าคงที่ต่างๆ เช่น ชื่อ Route, URL ของ API
├── context/         # Global State แบบง่ายๆ (เช่น ข้อมูล User ตอน Login)
├── hooks/           # Custom React Hooks สำหรับจัดการ Logic (เช่น useCart)
├── pages/           # หน้าเว็บแต่ละหน้า (1 หน้า = 1 โฟลเดอร์)
├── router/          # ตั้งค่าเส้นทางทั้งหมดของเว็บ (React Router)
├── services/        # ไฟล์จัดการ API คุยกับฝั่ง Backend (Axios)
├── types/           # กำหนดชนิดข้อมูล TypeScript (Interface/Type)
└── utils/           # ฟังก์ชันช่วยเหลือทั่วไป (เช่น แปลงวันที่, แปลงสกุลเงิน)
```

## 🚀 วิธีการรันโปรเจกต์ (สำหรับทีม)

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

2. **ตั้งค่า Environment:**
   สร้างไฟล์ `.env.local` ไว้ที่โฟลเดอร์นอกสุดของโปรเจกต์นี้ และใส่โค้ด:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

3. **รันเซิร์ฟเวอร์จำลอง (Development):**
   ```bash
   npm run dev
   ```

4. **การจัดระเบียบโค้ดอัตโนมัติ (Format Code):**
   โปรเจกต์นี้มี Prettier รบกวนทุกคนรันคำสั่งนี้ก่อน Push โค้ด:
   ```bash
   npx prettier --write "src/**/*.{ts,tsx,css,json}"
   ```

## 💡 กฎการเขียนโค้ดสำหรับทีม
- **API Calls:** ห้ามยิง API ตรงๆ ใน Component ให้ไปเขียนในโฟลเดอร์ `services/` เสมอ
- **Styling:** พยายามแยกไฟล์ CSS ออกมาตามหน้าเว็บ หรือ Component นั้นๆ เช่น `Home.css` คู่กับ `Home/index.tsx`
- **TypeScript:** พยายามใส่ Type ให้ตัวแปร/ฟังก์ชันเสมอ หลีกเลี่ยงการใช้ `any`
