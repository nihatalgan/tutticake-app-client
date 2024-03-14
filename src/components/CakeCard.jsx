import { Link } from "react-router-dom";

function CakeCard({ name, description, imageUrl, price, _id }) {
  return (
    <div>
      <Link to={`/cakes/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <img style={{ maxWidth: "400px" }} src={imageUrl}></img>
      <p>
        <b>Description:</b> {description}{" "}
      </p>
      <p>
        <b>Price:</b> {price}{" "}
      </p>
    </div>
  );
}

export default CakeCard;
