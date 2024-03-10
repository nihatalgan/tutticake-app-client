import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function AddCake() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCake = { name, description };

    axios
      .post(`${API_URL}/cakes/create`, newCake)
      .then((response) => {
        // Reset the state
        setName("");
        setDescription("");
        navigate("/cakes");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddCake">
      <h3>Add Cake</h3>

      <form onSubmit={handleSubmit}>
        {" "}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCake;
