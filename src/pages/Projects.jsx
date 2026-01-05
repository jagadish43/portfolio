import { useTheme } from "../context/ThemeContext";
import { Code, ExternalLink, Github } from "lucide-react";
import data from "../data/data.json";

const Projects = () => {
  const { currentTheme } = useTheme();

  const { main: projects, minor: minorProjects } = data.projects;

  const orangeMain = "#FF8C00"; // main orange
  const orangeLight = "#FFA94D"; // lighter shade

  return (
    <section
      id="projects"
      style={{
        backgroundColor: currentTheme.cardBg,
        color: currentTheme.textPrimary,
      }}
      className="py-20"
    >
      <div className="container mx-auto px-6">
        <h2
          style={{ color: currentTheme.heading }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {projects.map((p, i) => (
            <div
              key={i}
              style={{
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.border,
              }}
              className="rounded-xl border p-6 shadow hover:shadow-lg transition"
            >
              <div
                className="mb-4 flex items-center gap-2 font-semibold"
                style={{ color: orangeMain }}
              >
                <Code size={20} />
                {p.title}
              </div>

              <p style={{ color: currentTheme.textSecondary }}>{p.desc}</p>

              {/* Skills as normal text */}
              <div className="mt-4 text-sm">
                <strong style={{ color: "black" }}>Skills:</strong>{" "}
                <span style={{ color: currentTheme.textSecondary }}>
                  {p.tech.join(", ")}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 justify-end">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: orangeLight,
                    color: "#fff",
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  <Github size={16} /> Source
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: orangeMain,
                    color: "#fff",
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition"
                >
                  <ExternalLink size={16} /> View
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 🧩 Minor Projects */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 justify-items-center">
          {minorProjects.map((m, i) => (
            <div
              key={i}
              style={{
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.border,
              }}
              className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1 w-full sm:w-56"
            >
              <div
                className="flex items-center gap-2 mb-2 font-medium text-sm"
                style={{ color: orangeMain }}
              >
                <Code size={16} />
                {m.title}
              </div>

              <p
                className="text-xs leading-snug"
                style={{ color: currentTheme.textSecondary }}
              >
                {m.desc}
              </p>

              {/* Skills */}
              <div className="mt-2 text-xs">
                <strong style={{ color: "black" }}>Skills:</strong>{" "}
                <span style={{ color: currentTheme.textSecondary }}>
                  {m.tech.join(", ")}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 justify-between">
                <a
                  href={m.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: orangeLight,
                    color: "#fff",
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium hover:opacity-90 transition"
                >
                  <Github size={12} /> Source
                </a>
                
                {m.live && m.live.trim() !== "" ? (
                  <a
                    href={m.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: orangeMain,
                      color: "#fff",
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium hover:opacity-90 transition"
                  >
                    <ExternalLink size={12} /> View
                  </a>
                ) : (
                  <span className="text-gray-400 text-xs italic">
                  </span>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
