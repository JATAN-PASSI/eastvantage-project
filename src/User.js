import React from "react";
import axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

const User = () => {
  const url = `https://randomuser.me/api`;

  const [info, setInfo] = useState(null);

  //Fetching the data,updating state and storing in local storage
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const { name, email } = res.data.results[0];

      setInfo({ name: `${name.title} ${name.first} ${name.last}`, email });
      localStorage.setItem(
        "info",
        JSON.stringify({
          name: `${name.title} ${name.first} ${name.last}`,
          email,
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  //useEffect Hook to be used only one time while mounting
  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return (
    <div>
      {info ? (
        <div>
          <h2>Full Name: {info.name}</h2>
          <h2>Email: {info.email}</h2>
          <button onClick={refreshData}>Refresh Data</button>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default User;
