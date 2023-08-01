import React from "react";
import Table from "react-bootstrap/Table";

const MembershipTable = () => {
  return (
    <div className="members__table">
      <Table hover bordered className="w-75">
        <thead>
          <tr>
            <th></th>
            <th style={{ color: "rgba(190, 85, 4, 0.4)" }}>Bronze</th>
            <th style={{ color: "#6a6c82" }}>Silver</th>
            <th style={{ color: "rgba(212, 175, 55, 1)" }}>Gold</th>
            <th
              style={{
                color: "#213366",
              }}
            >
              Platinum
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daily Price</td>
            <td>Free</td>
            <td>₹19</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Weekly Price</td>
            <td>Free</td>
            <td>₹99</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Monthly Price</td>
            <td>Free</td>
            <td>N/A</td>
            <td>₹299</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Half-Yearly Price</td>
            <td>Free</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>₹999</td>
          </tr>
          <tr>
            <td>Yearly Price</td>
            <td>Free</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>₹1499</td>
          </tr>
          <tr>
            <td>Weekly SuperLike</td>
            <td>1</td>
            <td>1</td>
            <td>2</td>
            <td>7</td>
          </tr>
          <tr>
            <td>daily Swipes</td>
            <td>30</td>
            <td>50</td>
            <td>100</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Message Limit Per Match</td>
            <td>10</td>
            <td>50</td>
            <td>200</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Message Before Matching</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Allowed</td>
          </tr>
          <tr>
            <td>Blue Tick</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>
              <i class="bi bi-check-circle-fill"></i>
            </td>
            <td>
              <i class="bi bi-check-circle-fill"></i>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MembershipTable;
