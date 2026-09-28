export const links = {
  github: "https://github.com/AntonioPuceski",
  linkedin: "https://www.linkedin.com/in/antonio-puceski-9911b1239/",
  email: "mailto:puceskia@gmail.com",
};

export const experience = [
  {
    period: "Mar — Aug 2026",
    role: "Software Engineer Intern",
    company: "Vestel",
    summary: "Contributed to business applications and integrations across .NET services, Angular and Vue.js interfaces, and relational databases.",
    points: [
      "Built and improved authentication, user management, email workflows, validation, and public and administrative portal features on PakomakAds.",
      "Supported role-based administration, indicator-management workflows, notifications, and documentation on the PAF platform.",
      "Improved transaction processing, external integrations, background services, and automated reporting on Pakomak, with attention to atomic operations and duplicate prevention.",
    ],
    stack: "C# / ASP.NET Core / Angular / Vue.js / PostgreSQL / SQL Server",
  },
  {
    period: "Oct 2025 — Feb 2026",
    role: "QA Engineer",
    company: "Adbarcadero",
    summary: "Tested software through functional, regression, and exploratory testing, identifying defects and usability issues.",
    points: [
      "Documented reproducible issues with clear steps, expected and actual results, and supporting evidence.",
      "Worked with developers to clarify defects, verify fixes, and reduce regressions.",
    ],
    stack: "Functional testing / Regression testing / Exploratory testing",
  },
];

export type ProjectCategory = "Software" | "Applied AI";
export type ProjectVisual = "network" | "fitness" | "finance" | "vision" | "settle";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  visual: ProjectVisual;
  purpose: string;
  description: string;
  stack: string[];
  github: string;
  notes: { label: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "01", name: "Smart Incident Detection", category: "Applied AI", type: "Machine learning · Network security", visual: "network",
    purpose: "Taking a model beyond the notebook.",
    description: "An end-to-end prototype that classifies network traffic and makes model predictions understandable through an interactive dashboard.",
    stack: ["Python", "scikit-learn", "FastAPI", "React"],
    github: "https://github.com/AntonioPuceski/Smart-Incident-Detection-Dashboard-",
    notes: [
      { label: "The system", text: "Preprocess network-traffic features, train and evaluate a Random Forest classifier, persist the pipeline with joblib, and serve predictions through FastAPI." },
      { label: "The interface", text: "A React dashboard accepts traffic features and visualizes predicted classes and probabilities with Recharts." },
      { label: "The scope", text: "An applied machine-learning prototype using sampled CICIDS2018 data; not a deployed network-monitoring service." },
    ],
  },
  {
    id: "02", name: "GymTracker", category: "Software", type: "Software engineering · Fitness", visual: "fitness",
    purpose: "A place for every workout—and the progress after it.",
    description: "A fitness application for discovering exercises, building reusable workout plans, logging completed sessions, and tracking body weight.",
    stack: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL"],
    github: "https://github.com/AntonioPuceski/GymTracker",
    notes: [
      { label: "The system", text: "An ASP.NET Core API serves a responsive web interface, with EF Core migrations and PostgreSQL persistence." },
      { label: "The integration", text: "WGER synchronization brings exercise data into search, filtering, and favorites workflows. Dashboard summaries connect plans, sessions, and progress history." },
      { label: "The scope", text: "A portfolio application. Browser profile keys separate demo records; they are not an authentication or authorization layer." },
    ],
  },
  {
    id: "03", name: "Personal Finance Manager", category: "Software", type: "Software engineering · Finance", visual: "finance",
    purpose: "Making everyday finances easier to understand.",
    description: "Record income and expenses, filter transactions by date, and explore balances, category summaries, and spending through visualizations.",
    stack: ["Java", "Spring Boot", "React", "TypeScript"],
    github: "https://github.com/AntonioPuceski/-personal-finance-manager",
    notes: [
      { label: "The system", text: "A Spring Boot REST API and JPA data layer support transaction creation, editing, deletion, and date-range queries." },
      { label: "The interface", text: "The React and TypeScript client turns transaction data into balance summaries and income-versus-expense visualizations." },
    ],
  },
  {
    id: "04", name: "Computer Vision Sensor Hub", category: "Applied AI", type: "Computer vision · Human interaction", visual: "vision",
    purpose: "Turning a camera into an input device.",
    description: "An experiment in recognizing hand gestures, facial gestures, and head direction using a laptop camera and landmark tracking.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/AntonioPuceski/Python-camera-sensor-project",
    notes: [
      { label: "The system", text: "OpenCV and MediaPipe track hand and face landmarks to identify gestures such as a thumbs-up, a smile, a wink, and head movement." },
      { label: "The interaction", text: "Gesture counters, event logging, and FREE, GAME, and MENU modes explore how camera input can drive an interface. Results depend on lighting and gesture thresholds." },
    ],
  },
  {
    id: "05", name: "Split Settle", category: "Software", type: "Collaborative software · Shared expenses", visual: "settle",
    purpose: "Shared expenses, with less back-and-forth.",
    description: "Create a group, record expenses, and work out who owes what. Shareable groups and synchronized balances keep everyone on the same page.",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/AntonioPuceski/Split-Settle-App",
    notes: [
      { label: "The system", text: "A Supabase-backed data layer stores groups, participants, expenses, and settlements, with real-time synchronization for shared groups." },
      { label: "The workflow", text: "Record payments, calculate individual balances, review suggested settlements, and track debts as they are paid." },
    ],
  },
];

export const skills = [
  { category: "Software & systems", description: "Services, integrations, and the data behind them.", items: ["C# / .NET", "Java / Spring Boot", "REST APIs", "EF Core / JPA", "PostgreSQL", "SQL Server"] },
  { category: "Applied AI & data", description: "From data preparation to predictions people can use.", items: ["Python", "pandas", "scikit-learn", "FastAPI", "OpenCV", "MediaPipe"] },
  { category: "Interfaces & delivery", description: "Usable clients, clear collaboration, and careful verification.", items: ["TypeScript", "React / Angular / Vue", "React Native", "Git / Docker", "Swagger / OpenAPI", "Jira / QA"] },
];
