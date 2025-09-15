import React, { useEffect, useRef, useState } from 'react';

const AndroidLogo = () => (
  <svg
    className="logo-animation w-28 h-28 md:w-44 md:h-44 mb-4 md:mb-6 animate-fade-in"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Android Logo"
  >
    <path
      fill="#3DDC84"
      d="M399.03 336.05c0 36.3-29.47 65.76-65.75 65.76-36.3 0-65.75-29.46-65.75-65.76v-65.76h131.5v65.76zM337.3 297.66c-2.79-2.79-7.32-2.79-10.11 0l-45.2 45.19c-3.08 3.07-1.1 8.33 3.46 8.33h94.4c4.58 0 6.56-5.26 3.46-8.33l-45.2-45.19zM398.11 178.59a21.53 21.53 0 1 0 0-43.06 21.53 21.53 0 0 0 0 43.06zm-282.2 0a21.53 21.53 0 1 0 0-43.06 21.53 21.53 0 0 0 0 43.06zM242.75 365.59v38.39c0 4.53 3.68 8.2 8.21 8.2 4.51 0 8.2-3.67 8.2-8.2v-38.39c0-4.54-3.69-8.21-8.2-8.21-4.53 0-8.21 3.67-8.21 8.21z"
    />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sections = ['home', 'about', 'projects', 'events', 'contact'];

  const handleScroll = () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let currentSection = 'home';
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element && element.offsetTop <= scrollPos) {
        currentSection = section;
      }
    }
    setActive(currentSection);

    setScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Close menu on window resize if desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-3 md:py-4">
        <div
          className="text-2xl font-extrabold text-green-400 cursor-pointer select-none"
          onClick={() => scrollTo('home')}
          aria-label="Android Club Home"
        >
          Android Club
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 font-semibold text-white text-lg select-none">
          {sections.map((section) => (
            <li
              key={section}
              onClick={() => scrollTo(section)}
              className={`cursor-pointer hover:text-green-400 transition-colors duration-200 ${
                active === section ? 'text-green-400 underline underline-offset-4' : ''
              }`}
              tabIndex={0}
              role="link"
              aria-current={active === section ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter') scrollTo(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace('Us', ' Us')}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <line x1="18" y1="6" x2="6" y2="18" />
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-black bg-opacity-90 backdrop-blur-md transition-max-height duration-500 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col text-white font-semibold text-base select-none space-y-4 px-6 py-4">
          {sections.map((section) => (
            <li
              key={section}
              onClick={() => scrollTo(section)}
              className={`cursor-pointer hover:text-green-400 transition-colors duration-200 ${
                active === section ? 'text-green-400 font-bold' : ''
              }`}
              tabIndex={0}
              role="link"
              aria-current={active === section ? 'page' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter') scrollTo(section);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace('Us', ' Us')}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const Section = ({ id, title, children }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="max-w-6xl mx-auto px-6 py-24 scroll-mt-24 min-h-[400px] md:min-h-[600px]"
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
    >
      <h2
        id={`${id}-title`}
        className={`text-4xl md:text-5xl font-extrabold mb-10 text-white transition-all duration-700 ease-out transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {title}
      </h2>
      <div
        className={`prose prose-invert max-w-4xl transition-opacity duration-1000 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </section>
  );
};

const projectsData = [
  { id: 1, name: 'App One', description: 'An app that does something cool.', link: '#' },
  { id: 2, name: 'App Two', description: 'Another innovative project.', link: '#' },
  { id: 3, name: 'App Three', description: 'A wonderful Android app.', link: '#' },
];

const eventsData = [
  {
    id: 1,
    title: 'Android Workshop',
    date: 'Oct 1, 2025',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 2,
    title: 'Hackathon',
    date: 'Nov 5, 2025',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 3,
    title: 'Monthly Meetup',
    date: 'Dec 10, 2025',
    image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=600&q=60',
  },
];

const TypingText = ({ text, speed = 550, className }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [text, speed]);

  return (
    <h1 className={`${className} select-none`}>
      {displayedText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} inline-block animate-blink`}>|</span>
    </h1>
  );
};

const App = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen text-gray-300 font-sans antialiased">
      <Navbar />

      {/* Welcome Section */}
      <section
        id="home"
        className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-green-900 via-green-800 to-green-900 px-4 text-center"
        tabIndex={-1}
      >
        <AndroidLogo />
        <TypingText
          text="Anndroid Club"
          speed={120}
          className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg"
        />
        <p className="mt-5 text-lg md:text-xl text-green-400 italic drop-shadow-md max-w-md">
          Join the future of Android development!
        </p>
      </section>

      {/* About Us Section */}
      <Section id="about" title="About Us">
        <p className="text-lg leading-relaxed max-w-3xl">
          The Android Club is a vibrant community passionate about building and sharing innovative Android applications. We organize
          workshops, hackathons, and projects that empower members to learn, collaborate, and create cutting-edge apps.
        </p>
      </Section>

      {/* Projects Showcase Section */}
      <Section id="projects" title="Projects Showcase">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projectsData.map(({ id, name, description, link }) => (
            <a
              key={id}
              href={link}
              className="fade-in-on-scroll transform transition duration-700 opacity-0 translate-y-12 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl hover:shadow-green-500 scale-100 hover:scale-105 p-6 flex flex-col justify-between"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Project ${name}`}
            >
              <h3 className="text-2xl font-semibold text-green-400 mb-3 truncate">{name}</h3>
              <p className="text-gray-300 flex-grow">{description}</p>
              <span className="mt-4 text-green-400 font-semibold hover:underline">Learn More &rarr;</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Events Section */}
      <Section id="events" title="Events">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventsData.map(({ id, title, date, image }) => (
            <div
              key={id}
              className="fade-in-on-scroll transform transition duration-700 opacity-0 translate-y-12 bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
              role="article"
              aria-label={`Event: ${title}`}
            >
              <img src={image} alt={`${title} event`} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-5 flex flex-col flex-grow justify-between">
                <h4 className="text-xl font-semibold text-green-400 truncate">{title}</h4>
                <p className="text-gray-300 mt-1">{date}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Contact">
        <p className="mb-6 max-w-3xl">
          Connect with us on social media or send us an email to join the Android Club!
        </p>
        <ul className="flex space-x-8 text-green-400 text-lg">
          <li>
            <a href="mailto:androidclub@example.com" className="hover:underline" aria-label="Send email">
              Email
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/androidclub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Android Club Twitter"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/company/androidclub"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Android Club LinkedIn"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </Section>

      <footer className="bg-black bg-opacity-75 text-gray-400 py-6 text-center text-sm mt-12 select-none">
        &copy; {new Date().getFullYear()} Android Club. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
