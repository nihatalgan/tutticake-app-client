import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

//import cakeServices from "../services/cakes.service";
import orderServices from "../../services/order.service";
import CakeCard from "../../components/CakeCard";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";

const API_URL = "http://localhost:3000";

function OrderDetailsPage(props) {
  const { user } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [orderList, setOrder] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  //const { cakeId } = useParams();
  const [orderId, setOrderId] = useState([]);

  let list = new Array();
  const getOrder = () => {
    orderServices
      .getOrderDetails()
      .then((response) => {
        const orderDetails = response.data;
        let totalCost = 0;
        for (let i = 0; i < orderDetails.cakes.length; i++) {
          console.log(orderDetails._id);
          list.push(orderDetails.cakes[i]);
          totalCost = totalCost + orderDetails.cakes[i].price;
        }
        setOrder(list);
        setOrderId(orderDetails._id);
        setTotalCost(totalCost);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrder();
  }, []);

  const confirmOrder = () => {
    orderServices
      .closeOrder(orderId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {orderList.map((cake, index) => (
          <Col span={6} key={index}>
            <CakeCard {...cake} />
          </Col>
        ))}
      </Row>
      <Row>Total Cost: {totalCost} €</Row>
      <Col>
        <Link to={"/order/success"}>
          <Button type="primary" onClick={confirmOrder}>
            Confirm and Pay
          </Button>
        </Link>
      </Col>
    </div>
  );
}

export default OrderDetailsPage;
