import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { IoRocketOutline } from "react-icons/io5";

const steps = [
  {
    id: 1,
    icon: <MdAccountCircle aria-label="Create Profile Icon" />,
    text: "Create an Impressive Profile",
  },
  {
    id: 2,
    icon: <TbHandClick aria-label="Apply Jobs Icon" />,
    text: "Discover & Apply for Jobs",
  },
  {
    id: 3,
    icon: <IoRocketOutline aria-label="Grab Offer Icon" />,
    text: "Grab the Offer & Soar!",
  },
];

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h1>Grab Your Offer in just 3 Steps</h1>
        <h2>
          Don't miss out on your perfect opportunity. Experience a streamlined
          job search journey with us today!
        </h2>
        <div className="banner">
          {steps.map((step) => (
            <div className="card" key={step.id}>
              {step.icon}
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
