import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/logo.png" alt="logo" />
            <h2>Welcome back! Let's find Jobs for you </h2>
            <h3>Please enter your details!</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As:</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
               
              </div>
            </div>
            <div className="inputTag">
              <label>Email:</label>
              <div>
                <input
                  type="email"
                  placeholder="employer@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              
              </div>
            </div>
            <div className="inputTag">
              <label>Password:</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
               
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <p>Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
            
          </form>
        </div>
        <div className="banner">
          <img src="/auth.jpg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;