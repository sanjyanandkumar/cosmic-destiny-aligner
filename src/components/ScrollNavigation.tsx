import { useState, useEffect } from "react";
import { Link } from "react-scroll";

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "trust", label: "Trust" },
    { id: "verticals", label: "Divisions" },
    { id: "showcase", label: "Services" },
    { id: "how-it-works", label: "Process" },
    { id: "offers", label: "Offers" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-1/2 right-8 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="flex flex-col space-y-4">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={section.id}
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="group cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-primary border-primary scale-125"
                    : "border-primary/40 hover:border-primary hover:scale-110"
                }`}
              />
              <span
                className={`text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  activeSection === section.id
                    ? "text-primary opacity-100"
                    : "text-muted-foreground"
                }`}
              >
                {section.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ScrollNavigation;
