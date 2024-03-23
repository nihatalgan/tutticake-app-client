import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import cakeServices from "../../services/cakes.service";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Typography, Card, Divider, Button } from "antd";

function OrderDetailsPage() {
  const { setCartItemCount } = useContext(AuthContext);
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
        setCakeList(list);
        setOrder(oneOrder);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const confirmOrder = () => {
    orderServices
      .closeOrder(orderId, totalCost)
      .then((response) => {
        setCartItemCount(0)
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

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
