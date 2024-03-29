import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import AddProject from "../components/AddProject";
import OrderCard from "../../components/OrderCard";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Col, Row, Spin, Typography } from "antd";

const API_URL = "http://localhost:3000";

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getPreviousOrders = () => {
    orderServices
      .getPreviousOrders()
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getPreviousOrders();
  }, []);

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Typography.Title level={5}>Previous orders: </Typography.Title>
      <Row gutter={[16, 16]}>
        {orders.map((order) => (
          <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} key={order._id}>
            <OrderCard {...order} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default OrderListPage;
