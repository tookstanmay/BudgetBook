/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react";
import { Form } from "react-router-dom";

// heroicons import
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import problemSolving from "../assets/problemSolving.gif";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial success. Start your
          journey with us now.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your Name"
            autoComplete="off"
          />
          <input type="hidden" name="_action" value={"newUser"} />
          <button className="btn btn--dark" type="submit">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={problemSolving} height={450} width={450} alt="Person's image" />
    </div>
  );
};

export default Intro;
