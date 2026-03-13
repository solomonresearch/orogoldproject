import { useState, useEffect } from "react";
import LandingPage from "./LandingPage.jsx";
import ORODashboard from "./ORODashboard.jsx";
import ProofOfReserves from "./ProofOfReserves.jsx";

function getPageFromPath() {
  const path = window.location.pathname;
  if (path === "/dashboard") return "dashboard";
  if (path === "/proof-of-reserves") return "reserves";
  return "landing";
}

function App() {
  const [page, setPage] = useState(getPageFromPath);

  useEffect(() => {
    const onPopState = () => setPage(getPageFromPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (target) => {
    const pathMap = { landing: "/", dashboard: "/dashboard", reserves: "/proof-of-reserves" };
    const path = pathMap[target] || "/";
    window.history.pushState(null, "", path);
    setPage(target);
    window.scrollTo(0, 0);
  };

  if (page === "dashboard") {
    return <ORODashboard onNavigate={navigate} />;
  }

  if (page === "reserves") {
    return <ProofOfReserves onNavigate={navigate} />;
  }

  return <LandingPage onNavigate={navigate} />;
}

export default App;
