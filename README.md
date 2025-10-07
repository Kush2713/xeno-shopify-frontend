🛍️ Xeno Shopify Data Ingestion & Insights Dashboard

This project is a submission for the Xeno FDE Internship Assignment 2025. It simulates a multi-tenant Shopify data ingestion pipeline with a frontend dashboard for business insights.

📦 Tech Stack

Backend: Node.js (Express), Prisma ORM, PostgreSQL, Railway

Frontend: Next.js, Tailwind CSS, Chart.js, Vercel

External APIs: Shopify Admin API

🔗 Deployed URLs

Frontend (Vercel): https://xeno-shopify-dashboard-kushagra.vercel.app

Backend (Railway): https://xeno-shopify-backend-production.up.railway.app

🚀 Features

✅ Shopify API Integration

✅ Multi-tenant data isolation

✅ Email-authenticated dashboard (via NextAuth)

✅ Revenue trend chart (line graph with date filter)

✅ Top products (bar chart + list with images)

✅ Top customers (pie chart)

✅ KPIs: total customers, orders, products, quantity sold, revenue

🛠️ Setup Instructions
Backend

Clone repo:
git clone https://github.com/Kush2713/xeno-shopify-backend.git

Install dependencies:
cd xeno-shopify-backend
npm install

Create a .env file:
Add the following:

PORT=5000
SHOPIFY_STORE_DOMAIN
SHOPIFY_ADMIN_API_TOKEN
DATABASE_URL


Prisma setup:

npx prisma generate
npx prisma migrate dev --name init


Start server:
npm start

Frontend

Clone repo:
git clone https://github.com/Kush2713/xeno-shopify-frontend.git

Install dependencies:
cd xeno-shopify-dashboard
npm install

Create .env.local file:
Add this:

NEXT_PUBLIC_API_URL=https://xeno-shopify-backend-production.up.railway.app/shopify


Start dev server:
npm run dev

📊 API Endpoints

Endpoint	              Method	Description

/shopify/products	       GET	  Sync products from Shopify

/shopify/customers	       GET	  Sync customers from Shopify

/shopify/orders	           GET	  Sync orders from Shopify

/shopify/summary	       GET	  Get KPIs

/shopify/top-products	   GET	  Get top products by revenue

/shopify/top-customers	   GET	  Get top 5 customers by spend

/shopify/revenue-trend	   GET	  Revenue trend (date range filter)

/shopify/insights	       GET	  All metrics incl. quantity sold


🧱 Database Schema

Uses Prisma ORM and PostgreSQL:

model Tenant {

  id        Int       @id @default(autoincrement())
  
  name      String
  
  domain    String    @unique
  
  createdAt DateTime  @default(now())
  
  products  Product[]
  
  customers Customer[]
  
  orders    Order[]
  
}

model Product {

  id          Int      @id @default(autoincrement())
  
  shopifyId   String   @unique
  
  tenantId    Int
  
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  
  title       String
  
  description String?
  
  price       Float
  
  vendor      String?
  
  productType String?
  
  imageUrl    String?
  
  createdAt   DateTime @default(now())
  
}

model Customer {

  id         Int       @id @default(autoincrement())
  
  shopifyId  String    @unique
  
  tenantId   Int
  
  tenant     Tenant    @relation(fields: [tenantId], references: [id])
  
  firstName  String
  
  lastName   String
  
  email      String
  
  totalSpent Float     @default(0)
  
  createdAt  DateTime  @default(now())
  
  orders     Order[]
  
}

model Order {

  id          Int       @id @default(autoincrement())
  
  shopifyId   String    @unique
  
  tenantId    Int
  
  tenant      Tenant    @relation(fields: [tenantId], references: [id])
  
  customerId  Int
  
  customer    Customer  @relation(fields: [customerId], references: [id])
  
  total       Float
  
  createdAt   DateTime  @default(now())
  
  lineItems   Json
  
}

📁 Folder Structure

xeno-shopify-dashboard/

├── components

│ ├── Dashboard.js

│ ├── RevenueTrendChart.js

│ ├── TopCustomersChart.js

├── lib

│ └── api.js

├── pages

│ └── index.js

├── public

├── styles

├── README.md

├── package.json






xeno-shopify-backend/

├── controllers

│ └── shopifyController.js

├── prisma

│ ├── schema.prisma

│ └── seed.js (optional, if you used seeding)

├── routes

│ └── shopifyRoutes.js

├── services

│ └── shopifyService.js

├── .env

├── .gitignore

├── index.js

├── package.json

├── package-lock.json

├── README.md


🌍 Environment Variable (.env.local)

Create a file named .env.local in your root and add:

NEXT_PUBLIC_API_URL=https://xeno-shopify-backend-production.up.railway.app/shopify

🏗️ Architecture Diagram

![Architecture Diagram](image.png)

✅ Assumptions

1 Shopify store = 1 Tenant

Manual ingestion (via sync APIs)

Date filter applies only to Revenue Trend chart

⚠️ Known Limitations

Data sync is not automated (webhooks or scheduler can be added)

No frontend auth middleware implemented

Line items stored as JSON, not normalized

📹 Submission Checklist

 Deployed Backend on Railway : https://xeno-shopify-backend-production.up.railway.app 

 Deployed Frontend on Vercel : https://xeno-shopify-backend-production.up.railway.app

 GitHub Repos:

Backend: https://github.com/Kush2713/xeno-shopify-backend

Frontend: https://github.com/Kush2713/xeno-shopify-frontend

 README with setup + APIs

🙌 Built with ❤️ by Kushagra Sharma for Xeno FDE Internship Assignment – Sep 2025

📬 Contact

Kushagra Sharma | kushagrasharma27012003@gmail.com
