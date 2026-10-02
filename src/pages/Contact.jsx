import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>📍 123 Food Street, Rawalpindi</p>
      <p>📞 +92-300-1234567</p>
      <p>✉️ info@bistrodelight.com</p>
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?...your-location..."
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Contact;
