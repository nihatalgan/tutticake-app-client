import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

function OrderCard({ orderDate, isPaid, _id }) {
  return (
    <Link to={`/cakes`}>
      <Card bordered={false}>
        <Typography.Title level={3}>{orderDate}</Typography.Title>
        <Typography.Title level={5}>Price: {isPaid} €</Typography.Title>
        <Typography.Title level={5}>Price: helloo €</Typography.Title>
      </Card>
    </Link>
  );
}

export default OrderCard;
