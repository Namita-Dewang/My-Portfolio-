import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import profilePhoto from './formal_photo.png';
import office_lady from './office_lady.png';
import linkedinIcon from './linkdin.jpg';
import githubIcon from './github.svg';
import instaIcon from './insta.jpg';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
        const response = await axios.post('http://localhost:8080/api/contact', formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.data.success) {
            setStatus({ submitting: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' }); // Clear form
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, success: false }));
            }, 5000);
        } else {
            throw new Error(response.data.error || 'Failed to send message');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        setStatus({
            submitting: false,
            success: false,
            error: error.response?.data?.error || error.message || 'Failed to send message'
        });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Social Media Icons */}
      <motion.div 
        className="social-links-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="social-links">
          <a href="https://www.linkedin.com/in/namita-dewang-49639425b" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a href="https://github.com/Namita-Dewang" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
          <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer">
            <img src={instaIcon} alt="Instagram" className="social-icon" />
          </a>
        </div>
      </motion.div>

      {/* Home Section */}
      <motion.section
        id="home"
        className="home"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="home-content">
          <motion.div 
            className="text-content"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Hello, I'm <span>Namita Dewang</span></h1>
            <p className="tagline">Cloud engineer | React Enthusiast | Problem Solver | JAVA Developer</p>
          </motion.div>

          <motion.div 
            className="profile-container"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="background-animation"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="profile-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={profilePhoto} alt="Namita Dewang" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="about"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>About Me</h2>
        
        <div className="about-content">
          <div className="about-text">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              I'm Namita Dewang, a Computer Engineer with a passion for cloud computing and full-stack development. 
              With expertise in cloud technologies and a strong foundation in Java, I bring ideas to life through code. 
              My technical toolkit includes MySQL, C++, Linux, Red Hat, Node.js, and React, allowing me to build 
              robust and scalable solutions.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              What drives me is the opportunity to solve complex problems and create efficient, user-centric 
              applications. I'm constantly exploring new technologies and best practices to enhance my skills 
              and deliver innovative solutions that make a difference.
            </motion.p>
          </div>
          <div className="about-image-container">
            <img src={office_lady} alt="office-lady" style={{ width: "600px"}} />
          </div>

        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="projects"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Projects</h2>
        <div className="project-list">
          <motion.div 
            className="project-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="project-icon">🔍</div>
            <h3>Real-Time Shaft Detection System</h3>
            <span className="project-badge">Sponsored by Anad Group's of Industry</span>
            <p>Real-time monitoring and detection system for shaft manufacturing stages using YOLOv7 algorithm.</p>
            <div className="project-tech-stack">
              <span>YOLOv7</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>Computer Vision</span>
              <span>Real-time Detection</span>
            </div>
          </motion.div>

          <motion.div 
            className="project-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="project-icon">👁️</div>
            <h3>Color Blindness Simulator</h3>
            <p>Interactive application that simulates how images appear to individuals with different types of color blindness.</p>
            <div className="project-tech-stack">
              <span>HTML</span>
              <span>CSS</span>
              <span>Image Processing</span>
              <span>svg Filters</span>
              <span>servlet</span>
            </div>
          </motion.div>

          <motion.div 
    className="project-card"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
>
    <div className="project-icon">🤖</div>
    <h3>Zerodha Clone</h3>
    <p>
        It's an exact copy of the Zerodha website,UI and core functionalities.  
        The project includes real-time stock data visualization, interactive charts, and user authentication.
    </p>
    <div className="project-tech-stack">
        <span>React</span>
        <span>Node.js</span>
        <span>Express.js</span>
        <span>Chart.js</span>
        <span>MongoDB Atlas</span>
        <span>AWS</span>
    </div>
</motion.div>

        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Contact Me</h2>
        <p>Let's work together on your next project!</p>
        
        <motion.form 
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <motion.div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="contact-input"
              required
            />
          </motion.div>

          <motion.div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="contact-input"
              required
            />
          </motion.div>

          <motion.div>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="contact-input contact-textarea"
              rows="4"
              required
            />
          </motion.div>

          <motion.button 
            className="contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={status.submitting}
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status.success && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Message sent successfully!
            </motion.div>
          )}

          {status.error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status.error}
            </motion.div>
          )}
        </motion.form>
          
        <button className="contact-btn">Get in Touch</button>
      </motion.section>
    </div>
  );
}

export default App;
