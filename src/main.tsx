import { createRoot } from "react-dom/client";
import HomePage from "./pages/home";
import MainLayout from "./layouts/main";

import "./main.scss";

createRoot(document.getElementById("root")!).render(
  <MainLayout>
    <HomePage />
  </MainLayout>
);
