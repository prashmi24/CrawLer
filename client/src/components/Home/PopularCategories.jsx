import React from "react";
import { GrTechnology } from "react-icons/gr";
import { MdHealthAndSafety } from "react-icons/md";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { CiBank } from "react-icons/ci";
import { RiMovie2Fill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Information Technology (IT) and Software Development",
      subTitle: "821 Open Positions",
      icon: <GrTechnology aria-label="Technology Icon" />,
    },
    {
      id: 2,
      title: "Healthcare and Pharmaceuticals",
      subTitle: "550 Open Positions",
      icon: <MdHealthAndSafety aria-label="Healthcare Icon" />,
    },
    {
      id: 3,
      title: "Sales and Marketing",
      subTitle: "632 Open Positions",
      icon: <HiOutlineSpeakerphone aria-label="Marketing Icon" />,
    },
    {
      id: 4,
      title: "Banking and Financial Services",
      subTitle: "698 Open Postions",
      icon: <CiBank aria-label="Banking Icon" />,
    },
    {
      id: 5,
      title: "Media and Entertainment",
      subTitle: "235 Open Positions",
      icon: <RiMovie2Fill aria-label="Media Icon" />,
    },
    {
      id: 6,
      title: "Education",
      subTitle: "867 Open Positions",
      icon: <FaChalkboardTeacher aria-label="Education Icon" />,
    },
    {
      id: 7,
      title: "Consulting and Management",
      subTitle: "50 Open Positions",
      icon: <GrUserManager aria-label="Consulting Icon" />,
    },
    {
      id: 8,
      title: "Retail and E-commerce",
      subTitle: "80 Open Positions",
      icon: <MdOutlineShoppingCart aria-label="E-commerce Icon" />,
    },
  ];
  return (
    <div className="categories">
      <h1>Trending Job Categories</h1>
      <div className="banner">
        {categories.map((element) => (
          <article className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="text">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
