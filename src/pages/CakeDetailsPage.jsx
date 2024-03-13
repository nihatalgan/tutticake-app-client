import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import cakeServices from "../services/cakes.service";
import { AuthContext } from "../context/auth.context";

function CakeDetailsPage(props) {
  const { user } = useContext(AuthContext);

  const [cake, setCake] = useState(null);
  const { cakeId } = useParams();

  const getCake = () => {
    cakeServices.getCakeDetails(cakeId)
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
          <p>Created by: {cake.vendor && cake.vendor.name} </p>
        
        </>
      )}

      {/* {project &&
        project.tasks.map((task) => <TaskCard key={task._id} {...task} />)} */}

      <Link to="/cakes">
        <button>Back to the list of cakes</button>
      </Link>
      {
        cake && cake.vendor && user && cake.vendor._id === user._id && (
          <Link to={`/cakes/edit/${cakeId}`}>
            <button>Edit Cake</button>
          </Link>
        )
      }
    </div>
  );
}

export default CakeDetailsPage;
