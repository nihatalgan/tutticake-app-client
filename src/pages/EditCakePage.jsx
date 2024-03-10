import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function EditCakePage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { cakeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/cakes/${cakeId}`)
      .then((response) => {
        const oneCake = response.data;
        setName(oneCake.name);
        setDescription(oneCake.description);
      })
      .catch((error) => console.log(error));
  }, [cakeId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, description };

    axios
      .put(`${API_URL}/cakes/edit/${cakeId}`, requestBody)
      .then((response) => {
        navigate(`/cakes/${cakeId}`);
      });
  };

  const deleteCake = () => {
    axios
      .delete(`${API_URL}/cakes/${cakeId}`)
      .then(() => {
        navigate("/cakes");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Edit the Cake</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Cake</button>
      </form>

      {/*     ADD     */}
      <button onClick={deleteCake}>Delete Cake</button>
    </div>
  );
}

export default EditCakePage;
