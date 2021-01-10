import React from "react";
const Footer = (props) => {
  return (
    <footer className="flex footer">
      <div className="copyright">
        <h3>Copyright 2020</h3>
      </div>
      <div className="social-links">
        <a
          href="https://linkedin.com/in/barber-jeremy"
          rel="noreferrer"
          target="_blank"
          className="left-link"
        >
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
