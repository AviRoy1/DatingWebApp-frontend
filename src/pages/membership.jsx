import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import FooterThree from "../component/layout/footerthree";
import HeaderTwo from "../component/layout/headertwo";
import PageHeader from "../component/layout/pageheader";
import Footer from "../component/layout/footer";
const title = "Membership Levels";
const subtitle =
  "Our dating platform is like a breath of fresh air. Clean and trendy design with ready to use features we are sure you will love.";

let MembershipList = [
  {
    daycount: "Bronze",
    perMonth: "No payment , Free Forever",
    price: "Free",
    btnText: "Select Plan",
    faciList: [
      {
        iconName: "fa-solid fa-circle-check",
        text: "weekly 1 superlike",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "maximum 30 swipes per day",
      },
      {
        iconName: "fa-solid fa-circle-xmark",
        text: "If matches, then 5 messages each (total 10).",
      },
      {
        iconName: "fa-solid fa-circle-xmark",
        text: "No Blue Tick",
      },
    ],
  },
  {
    daycount: "Silver",
    perMonth: "paid 1 day ₹19 and 1 week ₹99",
    price: "₹99",
    btnText: "Select Plan",
    faciList: [
      {
        iconName: "fa-solid fa-circle-check",
        text: "weekly 1 superlike",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "maximum 50 swipes per day",
      },
      {
        iconName: "fa-solid fa-circle-xmark",
        text: "if matches then 25 messages each (total 50) ",
      },
      {
        iconName: "fa-solid fa-circle-xmark",
        text: "No Blue Tick",
      },
    ],
  },
  {
    daycount: "Gold",
    perMonth: "paid 30 days ₹299",
    price: "₹299",
    btnText: "Select Plan",
    faciList: [
      {
        iconName: "fa-solid fa-circle-check",
        text: "weekly 2 superlike",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "maximum 100 swipes per day",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "if matches then 100 messages each (total 200) ",
      },
      {
        iconName: "fa-solid fa-circle-xmark",
        text: "Blue Tick",
      },
    ],
  },
  {
    daycount: "Platinum",
    perMonth: "paid 6 months ₹999 paid 12 months ₹1499.",
    price: "₹999",
    btnText: "Select Plan",
    faciList: [
      {
        iconName: "fa-solid fa-circle-check",
        text: "daily 1 superlike",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "maximum unlimited swipes per day",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: " if matches then unlimited messages (for each)",
      },
      {
        iconName: "fa-solid fa-circle-check",
        text: "Blue Tick",
      },
    ],
  },
];

class MembershipPage extends Component {
  render() {
    return (
      <Fragment>
        <HeaderTwo />
        <PageHeader title={"Membership Levels"} curPage={"Membership"} />
        <div className="membership padding-top padding-bottom">
          <div className="container">
            <div className="section__header style-2 text-center">
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
            <div className="section__wrapper">
              <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
                {MembershipList.map((val, i) => (
                  <div className="col" key={i}>
                    <div className="membership__item">
                      <div className="membership__inner">
                        <div className="membership__head">
                          <h4>{val.daycount}</h4>
                          <p style={{ minHeight: "100px" }}>{val.perMonth}</p>
                        </div>
                        <div className="membership__body">
                          <h4>{val.price}</h4>
                          <ul>
                            {val.faciList.map((val, i) => (
                              <li key={i}>
                                {/* <i className={val.iconName}></i>{" "} */}
                                <span>
                                  {`${i + 1}.`} {val.text}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="membership__footer">
                          <Link to="/login" className="default-btn reverse">
                            <span>{val.btnText}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default MembershipPage;
