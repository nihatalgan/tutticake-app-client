import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import AddTask from "../components/AddTask";
// import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:3000";

function CakeDetailsPage(props) {
  const [cake, setCake] = useState(null);
  const { cakeId } = useParams();

  const getCake = () => {
    axios
      .get(`${API_URL}/cakes/${cakeId}`)
      .then((response) => {
        const oneCake = response.data;
        setCake(oneCake);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCake();
  }, []);

  return (
    <div>
      {cake && (
        <>
          <h1>{cake.name}</h1>
          <img src={cake.imageUrl}></img>
          <p style={{ maxWidth: "400px" }}>{cake.description} </p>
          <p>Price: {cake.price} </p>
        </>
      )}

      {/* {project &&
        project.tasks.map((task) => <TaskCard key={task._id} {...task} />)} */}

      <Link to="/cakes">
        <button>Back to the list of cakes</button>
      </Link>

      <Link to={`/cakes/edit/${cakeId}`}>
        <button>Edit Cake</button>
      </Link>
    </div>
  );
}

export default CakeDetailsPage;
