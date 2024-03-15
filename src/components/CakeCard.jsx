import { Link } from "react-router-dom";
import { Card ,Col,Row } from 'antd';


function CakeCard({ name, description, imageUrl, price, _id }) {
  return (
   
    <Card bordered={false}>
      <Link to={`/cakes/${_id}`}>
        <h3>{name}</h3>
      </Link>
      <img style={{ width: 240}}src={imageUrl}></img>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p>Price: {price} </p>
    </Card>    
  );
}

export default CakeCard;
