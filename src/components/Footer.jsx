import React from 'react';
import '../style/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-logo">
                    <h1>My Website</h1>
                </div>
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="footer-social">
                    <a href="https://facebook.com" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
