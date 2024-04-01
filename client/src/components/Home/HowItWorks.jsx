import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { TbHandClick } from "react-icons/tb";
import { IoRocketOutline } from "react-icons/io5";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h1>Grab Your Offer in just 3 Steps</h1>
          <h2>Don't miss out on your perfect opportunity. Experience a stremlined job search journey with us today!</h2>
          <div className="banner">
            <div className="card">
            <MdAccountCircle />
              <p>Create an Impressive Profile</p>
          
            </div>
            <div className="card">
            <TbHandClick />
              <p>Discover & Apply for Jobs</p>
          
            </div>
            <div className="card">
            <IoRocketOutline />
              <p>Grab the Offer & Soar!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
