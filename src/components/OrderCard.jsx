import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

function OrderCard({ updatedAt, totalPrice, _id, cakes }) {
  return (
    <Link to={`/order/${_id}`}>
      <Card bordered={false}>
        <Typography.Title level={5}>Ordered on: {new Date(updatedAt).toLocaleString('en-UK')}</Typography.Title>
        <Typography.Text>Order id: #{_id}</Typography.Text>
        <Typography.Title level={4}>
          Total Cakes: {cakes.length}
        </Typography.Title>
        <Typography.Title level={3}>
          Total Amount: {totalPrice} €
        </Typography.Title>
      </Card>
    </Link>
  );
}

export default OrderCard;
