import React from "react";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2017/04/Microsoft-logo.jpg",
    },
    {
      id: 2,
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2021/05/Swiggy-logo.png",
    },
    {
      id: 3,
      imageUrl:
        "https://logos-world.net/wp-content/uploads/2021/08/Byjus-Logo.png",
    },
    {
      id: 4,
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.jpg",
    },
    {
      id: 5,
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2017/06/Unilever-logo.jpg",
    },
    {
      id: 6,
      imageUrl: "https://1000logos.net/wp-content/uploads/2018/03/SBI-Logo.png",
    },
    {
      id: 7,
      imageUrl:
        "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png",
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h1>Trusted by top companies across the world</h1>
        <div className="banner">
          {companies.map((element) => (
            <div className="card" key={element.id}>
              <figure className="content">
                <div className="image">
                  <img src={element.imageUrl} alt={`${element.title} logo`} />
                </div>
                <figcaption>{element.name}</figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
