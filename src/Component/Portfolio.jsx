import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Menu, X, Server, Database, Award, Briefcase, GraduationCap, ChevronUp, Send, ExternalLink, Shield, TrendingUp, Cpu, Layout, Rocket, CheckCircle, AlertCircle } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'bbbf8f2d-54d2-40ee-829f-1c4fae8a9830',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: 'ashish2722001@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          setFormStatus('');
        }, 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    }
  };

  const skills = {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'Core Java', 'RESTful APIs'],
    database: ['MongoDB', 'PostgreSQL', 'Oracle Database'],
    tools: ['Git', 'GitHub', 'Visual Studio Code', 'Postman', 'Swagger', 'IntelliJ IDEA', 'Eclipse IDE']
  };

  const projects = [
    {
      title: 'ZERO-X Cloud Security Platform',
      icon: <Shield className="w-12 h-12" />,
      description: 'Multi-tenant SaaS solution securing AWS, GCP, and Azure environments',
      highlights: [
        'Engineered 100+ secure REST APIs with JWT authentication',
        'Implemented AI-driven risk assessment using Google Genkit + Gemini AI',
        'Integrated Trivy, Snyk, and Semgrep for vulnerability management',
        'Achieved 99.9% uptime with <150ms API response time'
      ],
      tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      title: 'RMS - Risk Management System',
      icon: <TrendingUp className="w-12 h-12" />,
      description: 'Single-page risk management platform for financial analysis',
      highlights: [
        'Real-time portfolio dashboards with VaR, volatility, and Sharpe ratios',
        'Rule-based violation detection with automated recommendations',
        'Complex state management using Redux Toolkit with RTK Query',
        'Advanced data visualization with ApexCharts and Recharts'
      ],
      tech: ['React 18', 'TypeScript', 'Vite', 'Redux Toolkit', 'TailwindCSS', 'Radix UI', 'Chart.js'],
      gradient: 'from-blue-600 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AS
            </a>

            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors relative group ${activeSection === item.toLowerCase() ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full ${activeSection === item.toLowerCase() ? 'w-full' : ''}`} />
                </a>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-b-2xl py-4 space-y-2 animate-fade-in">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzRoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium animate-fade-in">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Ashish Shirsat
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
            Frontend Developer | React Specialist | UI/UX Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2 shadow-xl cursor-pointer">
              <Mail className="w-5 h-5" />
              Get In Touch
            </button>
            <button onClick={() => scrollToSection('projects')} className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
              <Rocket className="w-5 h-5" />
              View Projects
            </button>
          </div>
          <div className="flex justify-center gap-6 animate-fade-in-up animation-delay-600">
            <a href="mailto:ashish2722001@gmail.com" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transform hover:scale-110 transition-all">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/ashish-shirsat" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transform hover:scale-110 transition-all">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/ashish022001" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transform hover:scale-110 transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="tel:+918856866220" className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transform hover:scale-110 transition-all">
              <Phone className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Dynamic and motivated Frontend Developer with a passion for creating engaging, responsive web applications. I specialize in modern JavaScript frameworks and have a proven track record of building scalable, user-centric solutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With expertise in React, Next.js, and TypeScript, I focus on delivering high-quality code and exceptional user experiences. I'm committed to continuous learning and staying updated with the latest web technologies.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently working at Infimatrix Technology Pvt. Ltd., I contribute to building innovative solutions while collaborating with talented teams in an Agile environment.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <MapPin className="w-6 h-6" />, label: 'Location', value: 'Yavatmal, Maharashtra' },
                { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'ashish2722001@gmail.com' },
                { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+91 8856866220' },
                { icon: <Briefcase className="w-6 h-6" />, label: 'Status', value: 'Available' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-l-4 border-blue-600">
                  {/* <div className="text-blue-600 mb-3">{item.icon}</div> */}
                  <h4 className="flex font-semibold gap-2 text-gray-900 mb-1">{item.icon} {item.label}</h4>
                  <p className="text-sm text-gray-600">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Frontend', icon: <Layout className="w-8 h-8" />, items: skills.frontend, color: 'from-blue-500 to-cyan-500' },
              { title: 'Backend', icon: <Server className="w-8 h-8" />, items: skills.backend, color: 'from-green-500 to-emerald-500' },
              { title: 'Database', icon: <Database className="w-8 h-8" />, items: skills.database, color: 'from-purple-500 to-pink-500' },
              { title: 'Tools', icon: <Cpu className="w-8 h-8" />, items: skills.tools, color: 'from-orange-500 to-red-500' }
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className={`bg-gradient-to-br ${project.gradient} p-8 text-white`}>
                  <div className="mb-4">{project.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90">{project.description}</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 mt-1">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="relative pl-8 border-l-2 border-blue-200">
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0" />
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-600">Frontend Developer</h3>
                  <p className="text-lg font-semibold text-gray-900">Infimatrix Technology Pvt. Ltd., Pune</p>
                  <p className="text-gray-600 italic">March 2025 – Present</p>
                </div>
              </div>
              <ul className="space-y-3 mt-6">
                {[
                  'Developing responsive web applications using HTML5, CSS3, JavaScript, React.js, and Next.js',
                  'Building user-friendly interfaces with modern UI frameworks including TailwindCSS and Bootstrap',
                  'Collaborating with cross-functional teams following Agile methodology',
                  'Integrating REST APIs for dynamic data handling and improved performance',
                  'Implementing state management and reusable UI components',
                  'Optimizing application performance and ensuring code quality'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education & Certification
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { degree: 'Master of Computer Applications (MCA)', institution: 'Swami Ramanand Teerth Marathwada University, Nanded', year: '2025' },
              { degree: 'Bachelor of Computer Applications (BCA)', institution: 'Sant Gadge Baba Amravati University, Amravati', year: '2022' },
              { degree: 'Full Stack Web Developer', institution: 'NareshIT Hyderabad', year: '2023', isCertification: true },
            ].map((edu, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-blue-600 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className={`inline-flex p-3 rounded-xl ${edu.isCertification ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'} text-white mb-4`}>
                  {edu.isCertification ? <Award className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{edu.degree}</h3>
                <p className="text-gray-600 mb-2">{edu.institution}</p>
                <p className="text-blue-600 font-semibold">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-16 rounded-full" />

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: <MapPin className="w-6 h-6" />, title: 'Location', value: 'Yavatmal, Maharashtra, India' },
                { icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'ashish2722001@gmail.com', link: 'mailto:ashish2722001@gmail.com' },
                { icon: <Phone className="w-6 h-6" />, title: 'Phone', value: '+91 8856866220', link: 'tel:+918856866220' },
                { icon: <Linkedin className="w-6 h-6" />, title: 'LinkedIn', value: 'linkedin.com/in/ashish-shirsat', link: 'https://linkedin.com/in/ashish-shirsat' }
              ].map((contact, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white">
                    {contact.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{contact.title}</h4>
                    {contact.link ? (
                      <a href={contact.link} className="text-blue-600 hover:underline flex items-center gap-1">
                        {contact.value}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="text-gray-600">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              {formStatus === 'success' && (
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Message Sent Successfully!</p>
                    <p className="text-sm text-green-700">I'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Oops! Something went wrong</p>
                    <p className="text-sm text-red-700">Please try again or email me directly at ashish2722001@gmail.com</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-5 h-5" />
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                Or email me directly at <a href="mailto:ashish2722001@gmail.com" className="text-blue-600 hover:underline font-medium">ashish2722001@gmail.com</a>
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 text-center">
        <p className="mb-2">&copy; 2025 Ashish Shirsat. All rights reserved.</p>
        <p className="text-gray-400">Built with passion and dedication using React & Tailwind CSS</p>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-110 transition-all z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}