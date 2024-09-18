import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isAuthorized, navigateTo]);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (!jobs.jobs || jobs.jobs.length === 0) {
    return <p>No job vacancies available at the moment.</p>;
  }

  return (
    <section className="jobs">
      <div className="container">
        <h1>Search and Apply to Latest Job Vacancies & Openings</h1>
        <div className="banner">
          {jobs.jobs.map((element) => (
            <div className="card" key={element._id}>
              <p>{element.title}</p>
              <p>{element.category}</p>
              <p>{element.country}</p>
              <Link to={`/job/${element._id}`}>Job Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
