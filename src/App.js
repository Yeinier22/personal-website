import Header from "./components/Header";
import LandingSection from "./components/LandingSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import AnalyticsTracker from "./components/AnalyticsTracker";
import "./App.css";

function App() {
  return (
    <AlertProvider>
      <div className="site-shell">
        <AnalyticsTracker />
        <Header />
        <main>
          <LandingSection />
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <ContactMeSection />
        </main>
        <Footer />
        <Alert />
      </div>
    </AlertProvider>
  );
}

export default App;
