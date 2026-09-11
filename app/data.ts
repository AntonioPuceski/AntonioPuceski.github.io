export const links = {
  github: "https://github.com/AntonioPuceski",
  linkedin: "https://www.linkedin.com/in/antonio-puceski-9911b1239/",
  email: "mailto:puceskia@gmail.com",
};

export const experience = [
  {
    period: "Mar 2026 — Aug 2026",
    role: "Full-Stack Engineer Intern",
    company: "Vestel",
    summary: "Contributing to full-stack applications using C#, ASP.NET Core, Angular, Vue.js, PostgreSQL, SQL Server, and REST APIs.",
    points: ["Improving data-processing reliability through atomic operations, duplicate prevention, model validation, and safer database and file handling.", "Supporting authentication, user management, administrative workflows, notifications, background services, integrations, and automated reporting.", "Collaborating with developers and stakeholders to troubleshoot issues and improve scalability, maintainability, monitoring, documentation, and user experience."],
  },
  {
    period: "Oct 2025 — Feb 2026",
    role: "QA Engineer",
    company: "Adbarcadero",
    summary: "Performed functional, regression, and exploratory testing to uncover defects and usability issues.",
    points: ["Documented reproducible defects with clear evidence and expected behaviour.", "Worked with developers to clarify issues, verify fixes, and reduce regressions."],
  },
  {
    period: "2023 — 2024",
    role: "International Work Experience",
    company: "USA & Germany",
    summary: "Completed two international work programmes, strengthening independence, adaptability, and professional communication in multicultural teams.",
    points: [],
  },
];

export const projects = [
  {
    index: "01", name: "GymTracker", type: "Backend API", accent: "cyan",
    purpose: "A dependable API for organising fitness data and tracking progress.",
    description: "Supports exercise discovery, reusable workout plans, completed sessions, favourites, body-weight history, dashboard summaries, and synchronisation with the WGER exercise API.",
    stack: ["C#", ".NET 10", "ASP.NET Core", "EF Core", "PostgreSQL"],
    github: "https://github.com/AntonioPuceski/GymTracker",
  },
  {
    index: "02", name: "Personal Finance Manager", type: "Full-stack application", accent: "blue",
    purpose: "A clear way to record transactions and understand personal cash flow.",
    description: "Provides transaction create, edit, and delete workflows, date-range filtering, dynamic balances, category summaries, and income-versus-expense visualisations.",
    stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL"],
    github: "https://github.com/AntonioPuceski/-personal-finance-manager",
    live: "https://personal-finance-manager-black.vercel.app/",
  },
  {
    index: "03", name: "Smart Incident Detection", type: "Applied ML system", accent: "violet",
    purpose: "An end-to-end prototype for classifying suspicious network traffic.",
    description: "Preprocesses traffic data, trains and persists a Random Forest model, serves predictions through FastAPI, and presents class probabilities in a React dashboard.",
    stack: ["Python", "scikit-learn", "FastAPI", "React", "Recharts"],
    github: "https://github.com/AntonioPuceski/Smart-Incident-Detection-Dashboard-",
  },
  {
    index: "04", name: "Split Settle", type: "Collaborative web app", accent: "mint",
    purpose: "A lightweight tool for tracking shared costs and settling group balances.",
    description: "Creates shareable groups, records participants and expenses, calculates balances, suggests settlements, and synchronises changes through a Supabase-backed data layer.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vitest"],
    github: "https://github.com/AntonioPuceski/Split-Settle-App",
  },
  {
    index: "05", name: "Computer Vision Sensor Hub", type: "Computer vision", accent: "orange",
    purpose: "An experimental camera interface for human gestures and head direction.",
    description: "Uses face and hand landmarks to recognise hand gestures, smiles, winks, eye closure, and head movement, with modes, event logging, and gesture counters.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/AntonioPuceski/Python-camera-sensor-project",
  },
];

export const skills = [
  { category: "Backend", items: ["C#", "ASP.NET Core", "Java", "Spring Boot", "REST APIs", "Entity Framework Core", "JPA", "FastAPI", "Express"] },
  { category: "Frontend", items: ["TypeScript", "JavaScript", "Angular", "React", "Vue.js", "React Native"] },
  { category: "Databases", items: ["PostgreSQL", "SQL Server", "MySQL", "H2"] },
  { category: "Tools & delivery", items: ["Git", "GitHub", "Docker", "Jira", "Swagger / OpenAPI"] },
  { category: "Data & applied AI", items: ["Python", "pandas", "scikit-learn", "OpenCV", "MediaPipe"] },
];
