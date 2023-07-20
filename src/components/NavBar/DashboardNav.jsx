import React from "react";
import n1 from "../../assets/icons/n1.png";
import n2 from "../../assets/icons/n2.png";
import n3 from "../../assets/icons/n3.png";
const DashboardNav = () => {
  return (
    <div className="dnav-container">
      <div className="dnav-icon-container">
        <div className="dnav-icon-background">
          <img src={n3} alt="icon" className="dnav-icon" />
        </div>
        <div className="dnav-icon-background">
          <img src={n1} alt="icon" className="dnav-icon" />
        </div>
        <div className="dnav-icon-background">
          <img src={n2} alt="icon" className="dnav-icon" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
