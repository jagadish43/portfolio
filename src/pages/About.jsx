import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import data from "../data/data.json";

const About = () => {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("skills");
  const { intro, skills, education } = data.about;

  const tabStyle = (tabName) => ({
    color: activeTab === tabName ? currentTheme.accent : currentTheme.textSecondary,
    borderBottom: activeTab === tabName ? `2px solid ${currentTheme.accent}` : "2px solid transparent",
  });

  const tabContent = {
    skills: (
      <div className="pt-4 space-y-4">
        <div className="mb-4">
          <div className="text-lg space-y-2">
            {skills.map((skill) => (
              <p key={skill.category}>
                <span
                  className="font-semibold"
                  style={{ color: currentTheme.accent }}
                >
                  {skill.category}:
                </span>{" "}
                {skill.items.join(", ")}
              </p>
            ))}
          </div>
        </div>
      </div>
    ),
    education: (
      <div className="pt-4 space-y-4">
        {education.map((item) => (
          <p key={item} className="text-lg">
            {item}
          </p>
        ))}
      </div>
    ),
  };

  return (
    <section
      id="about"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.textPrimary,
        transition: "background-color 0.5s, color 0.5s",
      }}
      className="py-20"
    >
      <div className="container mx-auto px-6">
        {/* Main Heading */}
        <h2
          style={{ color: currentTheme.accent }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Main Introduction Paragraph */}
          <p className="leading-relaxed mb-8 text-lg">{intro}</p>


          {/* Tab Navigation (Skills & Education) */}
          <div className="flex space-x-8 border-b-2" style={{ borderColor: currentTheme.border }}>
            <button
              onClick={() => setActiveTab("skills")}
              style={tabStyle("skills")}
              className="py-2 px-1 text-xl font-semibold transition-colors duration-300 capitalize hover:opacity-80 focus:outline-none"
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("education")}
              style={tabStyle("education")}
              className="py-2 px-1 text-xl font-semibold transition-colors duration-300 capitalize hover:opacity-80 focus:outline-none"
            >
              Education
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: currentTheme.cardBg }}>
            {activeTab === "skills" ? tabContent.skills : tabContent.education}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
