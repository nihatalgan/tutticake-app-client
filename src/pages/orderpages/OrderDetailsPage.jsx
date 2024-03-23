import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import cakeServices from "../../services/cakes.service";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:3000";

function OrderDetailsPage() {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState({});
  const [cakeList, setCakeList] = useState([]);
  const { orderId } = useParams();

  let list = new Array();
  const getOrderDetails = () => {
    orderServices
      .getOrderDetails(orderId)
      .then((response) => {
        const oneOrder = response.data;
        for (let i = 0; i < oneOrder.cakes.length; i++) {
          // console.log(cartDetails._id);
          list.push(oneOrder.cakes[i]);
        }
        console.log(list);
        setCakeList(list);
        console.log("order from response", oneOrder);
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <Row gutter={[24, 0]}>
      <Col span={16}>
        <Typography.Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          {order._id}
        </Typography.Title>

        <Divider />

        <Typography.Text> {order.totalPrice} </Typography.Text>
        <Row gutter={[16, 16]}>
          {cakeList.map((cake, index) => (
            <Col span={6} key={index}>
              <p>{cake.name}</p>
            </Col>
          ))}
        </Row>
        <Divider />
      </Col>
    </Row>
  );
}

export default OrderDetailsPage;
