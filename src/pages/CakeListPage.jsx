import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import AddProject from "../components/AddProject";
import CakeCard from "../components/CakeCard";

const API_URL = "http://localhost:3000";

function CakeListPage() {
  const [cakes, setCakes] = useState([]);

  const getAllCakes = () => {
    axios
      .get(`${API_URL}/cakes`)
      .then((response) => setCakes(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCakes();
  }, []);

  return (
    <div>
      {/* <AddProject refreshProjects={getAllProjects} /> */}

      {/* Below: UPDATE */}
      {cakes.map((cake) => (
        <CakeCard key={cake._id} {...cake} />
      ))}
    </div>
  );
}

export default CakeListPage;
