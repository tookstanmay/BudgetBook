import React from "react";
import "../index.css";

// heroicons import
import { TrashIcon } from "@heroicons/react/24/solid";

// assets
import invoice from "../assets/invoice.png";

// rrd imports
import { Form, NavLink } from "react-router-dom";
const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to={"/"} aria-label="Go to Home page">
        <img src={invoice} alt="" height={30} />
        <span style={{ color: "#0A3E73" }}>BudgetBook</span>
      </NavLink>
      {userName && (
        <Form
          action="/logout"
          method="post"
          onSubmit={(event) => {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm("Delete user and their data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <TrashIcon width={20} />
            <span>Delete user</span>
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
