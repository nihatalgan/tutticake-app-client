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

function CartDetailsPage(props) {
  const { user } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [orderList, setOrder] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [orderId, setOrderId] = useState([]);

  let list = new Array();
  const getCart = () => {
    orderServices
      .getCartDetails()
      .then((response) => {
        const cartDetails = response.data;
        let totalCost = 0;
        for (let i = 0; i < cartDetails.cakes.length; i++) {
          // console.log(cartDetails._id);
          list.push(cartDetails.cakes[i]);
          totalCost = totalCost + cartDetails.cakes[i].price;
        }
        setOrder(list);
        setOrderId(cartDetails._id);
        setTotalCost(totalCost);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCart();
  }, []);

  const confirmCart = () => {
    orderServices
      .closeOrder(orderId, totalCost)
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
          <Button type="primary" onClick={confirmCart}>
            Confirm and Pay
          </Button>
        </Link>
      </Col>
    </div>
  );
}

export default CartDetailsPage;
