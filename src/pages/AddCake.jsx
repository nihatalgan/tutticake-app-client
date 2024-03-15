import { useState } from "react";
import { useNavigate } from "react-router-dom";

import cakeServices from "../services/cakes.service";

function AddCake() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preperationTime, setPreperationTime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCake = { name, description, price, preperationTime };
    console.log(newCake);

    cakeServices
      .addCake(newCake)
      .then((response) => {
        // Reset the state
        setName("");
        setDescription("");
        setPrice("");
        setPreperationTime("");
        navigate("/cakes");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddCake">
      <h3>Add Cake</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
         <label>Preperation time (min):</label>
        <input
          type="number"
          name="preperationTime"
          value={preperationTime}
          onChange={(e) => setPreperationTime(Number(e.target.value))}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCake;
