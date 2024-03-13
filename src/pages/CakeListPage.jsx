import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import AddProject from "../components/AddProject";
import CakeCard from "../components/CakeCard";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:3000";

function CakeListPage() {
  const [cakes, setCakes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

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
      {isLoggedIn?( <Link to="/cakes/create">
        <button>Create a cake</button>
      </Link>):(<p>Please signin to sell or buy cakes.</p>)}
      
      {cakes.map((cake) => (
        <CakeCard key={cake._id} {...cake} />
      ))}
    </div>
  );
}

export default CakeListPage;
