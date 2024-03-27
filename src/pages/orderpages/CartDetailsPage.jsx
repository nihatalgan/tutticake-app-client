import { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import orderServices from "../../services/order.service";
import CakeCard from "../../components/CakeCard";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Button, Typography, Card, Flex, Grid } from "antd";

function CartDetailsPage(props) {
  const { setCartItemCount } = useContext(AuthContext);
  const [orderList, setOrder] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

  const getCart = () => {
    let list = new Array();
    orderServices
      .getCartDetails()
      .then((response) => {
        const cartDetails = response.data;
        let totalCost = 0;
        for (let i = 0; i < cartDetails.cakes.length; i++) {
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
        setCartItemCount(0)
        navigate('/order/success')
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Flex vertical={!screens.lg} align={ screens.lg ? "center" : "flex-start"} justify={ screens.lg ? "space-between" : "flex-end"}>
              <div>
                <Typography.Title level={3} style={{ margin: 0 }}>Your Cart</Typography.Title>
              </div>
              <Flex align="center" justify="space-between">
                <Typography.Text style={{ margin: '0 16px 0 0' }}>
                  Total Cost: 
                </Typography.Text>
                <Typography.Title
                  level={3}
                  style={{
                    margin: '0 32px 0 0'
                  }}
                >
                  {totalCost} €
                </Typography.Title>
                <Button type="primary" onClick={confirmCart} disabled={orderList.length < 1}>
                  Confirm and Pay
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Col>
        {orderList.map((cake, index) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} key={index}>
            <CakeCard {...cake} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CartDetailsPage;
