import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Restaurant Info */}
        <div className="footer-section">
          <h2>Bistro Delight</h2>
          <p>
            Serving delicious meals prepared with fresh ingredients and
            exceptional hospitality. Your perfect destination for memorable
            dining experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 123 Food Street, Lahore, Pakistan</p>
          <p>📞 +92 300 1234567</p>
          <p>✉️ info@bistrodelight.com</p>
        </div>

        {/* Opening Hours */}
        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Bistro Delight. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;