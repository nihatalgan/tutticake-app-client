import { Link } from "react-router-dom";
import { Card, Typography } from 'antd';


function CakeCard({ name, imageUrl, price, _id }) {
  return (
    <Link to={`/cakes/${_id}`}>
      <Card bordered={false}>
        <img style={{ width: 240, height: 260}}src={imageUrl} />
        <Typography.Title level={3}>{name}</Typography.Title>
        <Typography.Title level={5}>Price: {price}  €</Typography.Title>
      </Card>    
    </Link>
  );
}

export default CakeCard;
