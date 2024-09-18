import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase size={40} />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding size={40} />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers size={40} />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus size={40} />,
    },
  ];
  return (
    <section className="heroSection">
      <div className="container">
        <div className="title">
          <h1>
            Find Your Dream Job <br /> with CrawLer!
          </h1>
          <p>
            Welcome to our thriving hub where dreams meet opportunities! At
            CrawLer, we're passionate about connecting talented job seekers with
            forward-thinking employers. Whether you're seeking your next career
            move or eager to find the perfect candidate to join your team, we've
            got you covered. Our platform is designed to streamline the hiring
            process, making it seamless and efficient for both employers and job
            seekers. Join us in shaping the future of work, one successful match
            at a time. Your next career milestone awaits, and your ideal
            candidate is just a click away. Let's make great things happen
            together!
          </p>
        </div>
        <div className="image">
          <img
            src="/home.jpg"
            alt="A job seeker searching for jobs on CrawLe"
          />
        </div>
      </div>

      <div className="details">
        {details.map((element) => (
          <article className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="content">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
