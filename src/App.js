import { ChakraProvider } from "@chakra-ui/react"; 
import Header from "./components/Header"; 
import LandingSection from "./components/LandingSection"; 
import ProjectsSection from "./components/ProjectsSection"; 
import AboutSection from "./components/AboutSection"; 
import SkillsSection from "./components/SkillsSection"; 
import ContactMeSection from "./components/ContactMeSection"; 
import Footer from "./components/Footer"; 
import { AlertProvider } from "./context/alertContext"; 
import Alert from "./components/Alert"; 
import  "./App.css"

function App() { 
  return ( 
    <ChakraProvider> 
      <AlertProvider> 
        <main className="main"> 
          <Header /> 
          <LandingSection /> 
          <ProjectsSection /> 
          <AboutSection /> 
          <SkillsSection /> 
          <ContactMeSection /> 
          <Footer /> 
          <Alert /> 
        </main> 
      </AlertProvider> 
    </ChakraProvider> 
  ); 
 } 

export default App;
