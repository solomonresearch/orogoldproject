import { useState } from "react";
import LandingPage from "./LandingPage.jsx";
import ORODashboard from "./ORODashboard.jsx";

function App() {
  const [page, setPage] = useState("landing");

  const navigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  if (page === "dashboard") {
    return <ORODashboard onNavigate={navigate} />;
  }

  return <LandingPage onNavigate={navigate} />;
}

export default App;
