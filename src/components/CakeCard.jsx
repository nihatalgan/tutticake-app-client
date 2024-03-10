import { Link } from "react-router-dom";

function CakeCard({ name, description, imageUrl, price, _id }) {
  return (
    <div>
      <Link to={`/cakes/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <img src={imageUrl}></img>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p>Price: {price} </p>
    </div>
  );
}

export default CakeCard;
