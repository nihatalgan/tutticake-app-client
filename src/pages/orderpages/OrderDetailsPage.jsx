import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import cakeServices from "../../services/cakes.service";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Typography, Card, Divider, Button } from "antd";
import CakeCard from "../../components/CakeCard";

function OrderDetailsPage() {
  const [order, setOrder] = useState({});
  const [cakeList, setCakeList] = useState([]);
  const { orderId } = useParams();

  const getOrderDetails = () => {
    let list = new Array();
    orderServices
      .getOrderDetails(orderId)
      .then((response) => {
        const oneOrder = response.data;
        for (let i = 0; i < oneOrder.cakes.length; i++) {
          list.push(oneOrder.cakes[i]);
        }
        setCakeList(list);
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title
          level={3}
        >
          Order ID: #{order._id}
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Typography.Title level={4}> Total cost: {order.totalPrice} </Typography.Title>
      </Col>
            
      {cakeList.map((cake, index) => (
        <Col span={6} key={index}>
          <CakeCard {...cake} />
        </Col>
      ))}
    </Row>
  );
}

export default OrderDetailsPage;
