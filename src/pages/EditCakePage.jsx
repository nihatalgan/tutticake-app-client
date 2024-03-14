import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import cakeServices from "../services/cakes.service";
import { AuthContext } from "../context/auth.context";

function EditCakePage(props) {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { cakeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    cakeServices
      .getCakeDetails(cakeId)
      .then((response) => {
        const cakeData = response.data;
        setName(cakeData.name);
        setDescription(cakeData.description);
      })
      .catch((error) => console.log(error));
  }, [cakeId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, description };

    cakeServices.editCakeDetails(cakeId, requestBody).then((response) => {
      navigate(`/cakes/${cakeId}`);
    });
  };

  const deleteCake = () => {
    cakeServices
      .deleteCake(cakeId)
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

      <button onClick={deleteCake}>Delete Cake</button>
    </div>
  );
}

export default EditCakePage;
