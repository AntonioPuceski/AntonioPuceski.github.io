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

export type ProjectMedia = {
  label: string;
  disclosure: string;
  images: { src: string; caption: string }[];
  video: string;
  videoCaption: string;
};

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  visual: ProjectVisual;
  media?: ProjectMedia;
  purpose: string;
  description: string;
  stack: string[];
  github: string;
  notes: { label: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "01", media: {"label": "API-backed prototype", "disclosure": "Captured from the running app. The saved model contains only the Attack class; these predictions do not demonstrate reliable benign/attack discrimination.", "images": [{"src": "/projects/incident/input-form.jpg", "caption": "Traffic feature input"}, {"src": "/projects/incident/prediction.jpg", "caption": "Prediction and class probability"}, {"src": "/projects/incident/result-detail.jpg", "caption": "Prediction details"}, {"src": "/projects/incident/api-docs.jpg", "caption": "FastAPI endpoint documentation"}], "video": "/projects/incident/demo.mp4", "videoCaption": "12-second slideshow of captured interface states."}, name: "Smart Incident Detection", category: "Applied AI", type: "Machine learning · Network security", visual: "network",
    purpose: "Taking a model beyond the notebook.",
    description: "A network-traffic inference prototype connecting a saved classifier to an interactive dashboard, with visible model limitations.",
    stack: ["Python", "scikit-learn", "FastAPI", "React"],
    github: "https://github.com/AntonioPuceski/Smart-Incident-Detection-Dashboard-",
    notes: [
      { label: "The system", text: "A FastAPI service loads a saved Random Forest classifier with joblib and serves predictions to a React dashboard. Training experiments are retained in the notebook." },
      { label: "The interface", text: "A React dashboard accepts traffic features and visualizes predicted classes and probabilities with Recharts." },
      { label: "The scope", text: "The saved artifact contains only the Attack class and needs retraining before meaningful benign/attack classification. This is an inference prototype, not a deployed intrusion detector." },
    ],
  },
  {
    id: "02", media: {"label": "Fictional demo data", "disclosure": "Captured from the real frontend using fictional fixture responses. These previews do not demonstrate a connected PostgreSQL backend.", "images": [{"src": "/projects/gym/dashboard.jpg", "caption": "Workout dashboard"}, {"src": "/projects/gym/exercises.jpg", "caption": "Exercise library"}, {"src": "/projects/gym/plans.jpg", "caption": "Reusable workout plans"}, {"src": "/projects/gym/log-workout.jpg", "caption": "Logging a workout"}, {"src": "/projects/gym/progress.jpg", "caption": "Body-weight progress"}], "video": "/projects/gym/demo.mp4", "videoCaption": "20-second slideshow of captured screens with sample data."}, name: "GymTracker", category: "Software", type: "Software engineering · Fitness", visual: "fitness",
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
    id: "04", media: {"label": "Simulated input", "disclosure": "Original OpenCV interface and gesture rules with synthetic landmarks. No webcam or MediaPipe inference was used for this preview.", "images": [{"src": "/projects/sensor/game.jpg", "caption": "Game mode with a synthetic peace gesture"}, {"src": "/projects/sensor/free.jpg", "caption": "Free mode and gesture counters"}, {"src": "/projects/sensor/paused.jpg", "caption": "Paused game"}, {"src": "/projects/sensor/menu.jpg", "caption": "Gesture-controlled menu"}], "video": "/projects/sensor/preview.mp4", "videoCaption": "16-second slideshow of offline rendered interface states."}, name: "Computer Vision Sensor Hub", category: "Applied AI", type: "Computer vision · Human interaction", visual: "vision",
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
  {
    id: "06", name: "Live Flight Tracker", category: "Software", type: "Real-time systems · Geospatial visualization", visual: "network",
    purpose: "A live view of the skies above Europe.",
    description: "Explore altitude-aware aircraft positions, search callsigns and inspect reported telemetry on an interactive WebGL map.",
    stack: ["React", "TypeScript", "deck.gl", "FastAPI", "WebSockets"],
    github: "https://github.com/AntonioPuceski/live-flight-tracker",
    media: {"label": "Recorded live data", "disclosure": "Captured with live OpenSky data. This is a recorded demonstration, not a live feed; flight positions and counts change over time.", "images": [{"src": "/projects/flights/overview.jpg", "caption": "European air traffic overview"}, {"src": "/projects/flights/search.jpg", "caption": "Callsign search"}, {"src": "/projects/flights/telemetry.jpg", "caption": "Selected-flight telemetry"}], "video": "/projects/flights/demo.mp4", "videoCaption": "Silent edited browser capture of the overview, search and telemetry."},
    notes: [
      { label: "The data flow", text: "A FastAPI polling loop shares OpenSky state vectors with browsers over WebSockets. deck.gl renders aircraft and recent trails." },
      { label: "The motion", text: "Client-side dead reckoning projects speed and heading between snapshots, then corrects positions as fresh reports arrive. Projection stops when data becomes stale." },
      { label: "The scope", text: "An exploratory visualization using public telemetry, with missing measurements marked unavailable. The preview is a recording, not a live feed or navigation tool." },
    ],
  },

];

export const skills = [
  { category: "Software & systems", description: "Services, integrations, and the data behind them.", items: ["C# / .NET", "Java / Spring Boot", "REST APIs", "EF Core / JPA", "PostgreSQL", "SQL Server"] },
  { category: "Applied AI & data", description: "From data preparation to predictions people can use.", items: ["Python", "pandas", "scikit-learn", "FastAPI", "OpenCV", "MediaPipe"] },
  { category: "Interfaces & delivery", description: "Usable clients, clear collaboration, and careful verification.", items: ["TypeScript", "React / Angular / Vue", "React Native", "Git / Docker", "Swagger / OpenAPI", "Jira / QA"] },
];
