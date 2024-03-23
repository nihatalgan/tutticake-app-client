import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

function OrderCard({ updatedAt, totalPrice, _id }) {
  return (
    <Link to={`/order/${_id}`}>
      <Card bordered={false}>
        <Typography.Title level={5}>Order Date: {updatedAt}</Typography.Title>
        <Typography.Title level={5}>
          Total Amount: {totalPrice}
        </Typography.Title>
      </Card>
    </Link>
  );
}

export default OrderCard;
