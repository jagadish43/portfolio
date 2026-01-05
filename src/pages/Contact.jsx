import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Code, Send, Eye } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import data from "../data/data.json";
import { toPublicPath } from "../utils/publicPath";

const iconMap = {
  linkedin: <Linkedin size={18} />,
  github: <Github size={18} />,
  code: <Code size={18} />,
};

const Contact = () => {
  const { currentTheme } = useTheme();
  const { phone, email: contactEmail, resumePath, whatsappNumber, socials } = data.contact;
  const phoneLink = phone.replace(/\s+/g, "");
  const resumeUrl = toPublicPath(resumePath);
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // WhatsApp Send
  const handleSend = () => {
    const { email, contact, message } = formData;
    const text = `Hello Jagadish,%0A%0AEmail: ${email}%0AContact: ${contact}%0AMessage: ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  // Only the social icons that should have hover effects (small buttons)
  const quickSocials = socials.map((item) => ({
    ...item,
    icon: iconMap[item.icon] ?? <Code size={18} />,
  }));

  return (
    <section
      id="contact"
      style={{
        backgroundColor: currentTheme.cardBg,
        color: currentTheme.textPrimary,
        transition: "background-color 0.4s, color 0.4s",
      }}
      className="py-20"
    >
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2
          style={{ color: currentTheme.heading }}
          className="text-4xl md:text-5xl font-bold text-center mb-10"
        >
          Let's Connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT SIDE: Contact Info (cards + small hover icons row) */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div
              style={{
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.border,
              }}
              className="p-8 rounded-xl border shadow hover:shadow-lg transition"
            >
              <Phone size={32} color={currentTheme.accent} className="mx-auto md:mx-0 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <a
                href={`tel:${phoneLink}`}
                style={{ color: currentTheme.textSecondary }}
                className="block hover:text-orange-500 transition"
              >
                {phone}
              </a>
            </div>

            <div
              style={{
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.border,
              }}
              className="p-8 rounded-xl border shadow hover:shadow-lg transition"
            >
              <Mail size={32} color={currentTheme.accent} className="mx-auto md:mx-0 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <a
                href={`mailto:${contactEmail}`}
                style={{ color: currentTheme.textSecondary }}
                className="hover:text-orange-500 transition"
              >
                {contactEmail}
              </a>
            </div>

            <div className="flex justify-center md:justify-start gap-3 mt-6 flex-wrap items-center">
              {quickSocials.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                  style={{
                    borderColor: currentTheme.border,
                    color: currentTheme.textSecondary,
                  }}
                  className="w-10 h-10 flex items-center justify-center border rounded-full transition-all
                            hover:bg-orange-500 hover:text-white hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}

              {/* View Resume Button inline */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: currentTheme.accent,
                  color: "#fff",
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-medium hover:opacity-90 transition-all"
              >
                <Eye size={18} />
                <span className="text-sm">View Resume</span>
              </a>
            </div>

          </div>
          <div
            style={{
              backgroundColor: currentTheme.background,
              borderColor: currentTheme.border,
            }}
            className="p-8 rounded-xl border shadow"
          >
            <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                backgroundColor: currentTheme.cardBg,
                color: currentTheme.textPrimary,
                borderColor: currentTheme.border,
              }}
              className="w-full p-3 rounded-lg border mb-4 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              name="contact"
              placeholder="Your Contact Number"
              value={formData.contact}
              onChange={handleChange}
              style={{
                backgroundColor: currentTheme.cardBg,
                color: currentTheme.textPrimary,
                borderColor: currentTheme.border,
              }}
              className="w-full p-3 rounded-lg border mb-4 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              style={{
                backgroundColor: currentTheme.cardBg,
                color: currentTheme.textPrimary,
                borderColor: currentTheme.border,
              }}
              rows={5}
              className="w-full p-3 rounded-lg border mb-6 outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <button
              onClick={handleSend}
              style={{
                backgroundColor: currentTheme.accent,
                color: "#fff",
              }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
            >
              <Send size={20} />
              Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
