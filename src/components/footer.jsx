import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { currentTheme } = useTheme();
  return (
    <footer
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.textSecondary,
        borderTop: `1px solid ${currentTheme.border}`,
      }}
      className="py-6 text-center"
    >
      © 2026 Jagadish.
    </footer>
  );
};

export default Footer;
