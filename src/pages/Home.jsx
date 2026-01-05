import { useTheme } from "../context/ThemeContext";
import LaptopMan from "/svg/laptop-looking.svg"; 
import { useEffect, useState } from "react";
import data from "../data/data.json";

const roles = data.home.roles;

const Home = ({ scrollToSection }) => {
  const { currentTheme } = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!deleting) {
      if (charIndex < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setDeleting(true), 1000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        // Move to next role
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      id="home"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.textPrimary,
      }}
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 transition-colors duration-500"
    >
      {/* Left Side: Text */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1
          style={{ color: currentTheme.heading }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Hello, <br /> I’m{" "}
          <span style={{ color: currentTheme.accent }}>{data.home.name}</span>
        </h1>

        <h2
          style={{ color: currentTheme.accent }}
          className="text-2xl md:text-3xl font-semibold mt-2"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </h2>

        {/* Optional Extra Polish */}
        <p
          style={{ color: currentTheme.textSecondary }}
          className="text-lg md:text-xl max-w-md mx-auto md:mx-0 mt-2"
        >
          {data.home.intro}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
          <button
            onClick={() => scrollToSection("about")}
            style={{
              backgroundColor: currentTheme.accent,
              color: "#fff",
            }}
            className="px-8 py-3 rounded-full font-medium hover:opacity-90 transition-all"
          >
            Learn More
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            style={{
              borderColor: currentTheme.accent,
              color: currentTheme.accent,
            }}
            className="px-8 py-3 border rounded-full font-medium hover:bg-orange-50 transition-all"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Right Side: SVG */}
      <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img src={LaptopMan} alt="Laptop Man" className="w-3/4 md:w-full h-auto" />
      </div>
    </section>
  );
};

export default Home;
