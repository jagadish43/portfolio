import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ scrollToSection, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme, currentTheme } = useTheme();

  const menuItems = ["home", "about", "experience", "projects", "certificates", "contact"];

  const handleMenuItemClick = (item) => {
    scrollToSection(item);
    setMenuOpen(false);
  };
  
  const isItemActive = (item) => item === activeSection;

  return (
    <nav
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.textPrimary,
        borderBottom: `1px solid ${currentTheme.border}`,
      }}
      className="fixed top-0 w-full z-50 shadow-sm"
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          onClick={() => handleMenuItemClick("home")}
          className="text-2xl font-bold cursor-pointer select-none"
          style={{
            color: currentTheme.accent,
          }}
        >
          Jagadish
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollToSection(item)}
                // Dynamic style for active link (Desktop)
                style={{ 
                  color: isItemActive(item) ? currentTheme.accent : currentTheme.textSecondary 
                }}
                className="capitalize font-medium hover:text-orange-500 transition" 
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              color: currentTheme.textSecondary,
            }}
            className="p-2 rounded-full hover:bg-gray-200/40 transition"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile Menu Button - The only place the menu icon toggles to X */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200/30"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: currentTheme.textPrimary }}
          >
            {/* FIX: This button now serves as both the open and close (X) button. */}
            {menuOpen ? <X size={24} /> : <Menu size={24} />} 
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (Small Box with NO internal Close Button) */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: currentTheme.cardBg,
            boxShadow: `0 4px 6px -1px ${currentTheme.border}`, 
            border: `1px solid ${currentTheme.border}`,
          }}
          className="md:hidden absolute top-full right-6 w-11/12 max-w-xs shadow-lg rounded-xl z-50 p-6 transition-all duration-300 ease-in-out origin-top-right animate-slideIn" 
        >
          {/* FIX: Removed the redundant internal Close Button (X icon) here. 
            The one in the main navbar handles closing.
          */}
          
          <ul className="flex flex-col items-start space-y-4 pt-4"> {/* Added a bit of top padding */}
            {menuItems.map((item) => (
              <li key={item} className="w-full">
                <button
                  onClick={() => handleMenuItemClick(item)}
                  style={{ 
                    // FIX: Removed background/border to get rid of the "black line" box
                    color: isItemActive(item) ? currentTheme.accent : currentTheme.textPrimary, 
                  }}
                  className="capitalize text-lg font-medium w-full text-left p-2 rounded hover:text-orange-500 transition"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
