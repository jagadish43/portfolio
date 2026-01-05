import { useEffect, useState, useRef } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Contact from "./pages/Contact";

const sectionIds = ["home", "about", "experience", "projects", "certificates", "contact"];

const useActiveSection = (ids) => {
  const [activeSection, setActiveSection] = useState(ids[0]);
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        let mostVisibleSection = activeSection;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection !== activeSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8], 
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.current?.observe(element);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [ids, activeSection]);

  return activeSection;
};

function App() {
  const activeSection = useActiveSection(sectionIds);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-transparent from-gray-900 via-gray-900/95 to-black text-white min-h-screen overflow-x-hidden">
      <Navbar scrollToSection={scrollToSection} activeSection={activeSection} />

      <div className="pt-20"> 
        <section id="home">
          <Home scrollToSection={scrollToSection} />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="certificates">
          <Certificates />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;
