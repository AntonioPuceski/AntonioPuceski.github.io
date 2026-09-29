import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Portfolio } from "../app/portfolio";
import "../app/globals.css";
import "../app/portfolio-map.css";

createRoot(document.getElementById("root")!).render(<StrictMode><Portfolio /></StrictMode>);
