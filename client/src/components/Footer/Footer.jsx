import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import "./Footer.css";

const Footer = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, []);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <p className="footer-brand">© {new Date().getFullYear()} AdityaAman</p>
          <p className="datetime">{dateTime.toLocaleString()}</p>
        </div>
        <div className="footer-section">
          <p>Follow Us:</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <p>Contact Us:</p>
          <p>
            <MdEmail /> Email: contact@adityaaman.com
          </p>
          <p>
            <MdPhone /> Phone: +123 456 7890
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
