import React from "react";
import s1 from "../../assets/icons/s1.png";
import s2 from "../../assets/icons/s2.png";
import s3 from "../../assets/icons/s3.png";
import p1 from "../../assets/icons/p1.png";
import p2 from "../../assets/icons/p2.png";
import p3 from "../../assets/icons/p3.png";
import p4 from "../../assets/icons/p4.png";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-details-container">
        <div className="footer-detail">
          <div className="footer-detail-heading">Legal</div>
          <div className="footer-detail-subheading">Privacy</div>
          <div className="footer-detail-subheading">Terms</div>
          <div className="footer-detail-subheading">Cookies</div>
          <div className="footer-detail-subheading">Intellectual Property</div>
          {/* <hr className="footer-hr" /> */}
        </div>
        <div className="footer-detail">
          <div className="footer-detail-heading">Social</div>
          <img src={s1} alt="icon" className="footer-detail-icon" />
          <img src={s2} alt="icon" className="footer-detail-icon" />
          <img src={s3} alt="icon" className="footer-detail-icon" />
          {/* <hr className="footer-hr" /> */}
        </div>
        <div className="footer-detail">
          <div className="footer-detail-heading">Payments</div>
          <div className="footer-detail-subheading">Plans</div>
          <img src={p1} alt="icon" className="footer-detail-icon" />
          <img src={p2} alt="icon" className="footer-detail-icon" />
          <img src={p3} alt="icon" className="footer-detail-icon" />
          <img src={p3} alt="icon" className="footer-detail-icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
