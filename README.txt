========================================================================
TEAM TASK MANAGER - NEXT.JS & GEMINI AI
========================================================================

A high-performance, role-based Team Task Manager built with Next.js, 
Prisma, PostgreSQL, and Gemini AI. Designed with a professional 
"Linear" inspired design system.

------------------------------------------------------------------------
CORE FEATURES
------------------------------------------------------------------------
1. ROLE-BASED ACCESS CONTROL (RBAC):
   - ADMIN: Full control over project workspaces and team management.
   - MEMBER: Restricted view focused on assigned tasks.

2. GEMINI AI INTEGRATION:
   - AI TASK WRITER: Automatically generates professional task 
     descriptions based on titles.
   - AI SMART SUMMARY: A dashboard widget that analyzes active 
     tasks and provides a "Focus of the Day" summary.

3. TASK MANAGEMENT:
   - High-density task lists with status (Todo, In Progress, etc.) 
     and priority levels (Low, Medium, High, Urgent).
   - Assignment system to link tasks to specific team members.

4. PROFESSIONAL DESIGN:
   - Dark Mode UI inspired by Linear.app.
   - Built with Shadcn UI and customized Tailwind CSS v4.

------------------------------------------------------------------------
TECH STACK
------------------------------------------------------------------------
- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: Shadcn UI + Tailwind CSS v4
- Database: PostgreSQL (Neon.tech)
- ORM: Prisma 7
- Auth: Custom JWT + Bcrypt + Middleware
- AI: Google Gemini 1.5 Flash SDK

------------------------------------------------------------------------
LOCAL SETUP INSTRUCTIONS
------------------------------------------------------------------------
1. Install Dependencies:
   npm install

2. Configure Environment (.env):
   DATABASE_URL="your_postgresql_url"
   JWT_SECRET="any_secure_random_string"
   GEMINI_API_KEY="your_google_ai_key"

3. Initialize Database:
   npx prisma db push

4. Seed Demo Accounts:
   npx prisma db seed

5. Run Development Server:
   npm run dev

------------------------------------------------------------------------
DEMO CREDENTIALS
------------------------------------------------------------------------
Access the "Demo Login" section on the sign-in page:
ADMIN:  demo@example.com / password123
MEMBER: member@example.com / password123

------------------------------------------------------------------------
DEPLOYMENT (VERCEL)
------------------------------------------------------------------------
This project is 100% optimized for Vercel deployment.

1. Push your code to a GitHub repository.
2. Log into Vercel and click "Add New..." -> "Project".
3. Import your GitHub repository.
4. Under "Environment Variables", add the following three keys:
   - DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.yckzeszmlbpanxsibloh.supabase.co:5432/postgres"
   - JWT_SECRET="any_secure_random_string"
   - GEMINI_API_KEY="your_google_ai_key"
5. Click "Deploy". Vercel will automatically detect Next.js and Prisma, 
   build the project, and give you a live URL in seconds.


========================================================================
END OF DOCUMENT
========================================================================
