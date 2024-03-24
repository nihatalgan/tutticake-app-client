import { useState, useEffect, useContext } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import cakeServices from "../../services/cakes.service";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button, notification } from "antd";
import { ArrowLeftOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function CakeDetailsPage(props) {
  const { user, setCartItemCount } = useContext(AuthContext);

  const [cake, setCake] = useState({});
  const { cakeId } = useParams();
  const navigate = useNavigate();

  const getCake = () => {
    cakeServices
      .getCakeDetails(cakeId)
      .then((response) => {
        const oneCake = response.data;
        setCake(oneCake);
      })
      .catch((error) => console.log(error));
  };

  const addCakeToCart = () => {

    orderServices.addCakeToCart(cakeId)
      .then((addResponse) => {
        orderServices.getCartDetails()
        .then((response) => {
          const count = response.data.cakes.length
          setCartItemCount(count);
          navigate('/cakes')
        })
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCake();
  }, []);

  return (
    <Row gutter={[24, 0]}>
      <Col span={16}>
        <Image width={"60%"} src={cake.imageUrl} preview={false} />
        <Typography.Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          {cake.name}
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{
            margin: 0,
          }}
        >
          Sold by: {cake.vendor && cake.vendor.name}
        </Typography.Title>
        <Divider />
        <Typography.Title
          level={4}
          style={{
            margin: 0,
          }}
        >
          Description
        </Typography.Title>
        <Typography.Text>{cake.description}</Typography.Text>
        <Divider />
        <Row gutter={[16, 0]}>
          <Col>
            <Link to="/cakes">
              <Button icon={<ArrowLeftOutlined />}>
                Back to the list of cakes
              </Button>
            </Link>
          </Col>
          <Col>
            {
              cake && cake.vendor && user && cake.vendor._id === user._id ? (
                <Link to={`/cakes/edit/${cakeId}`}>
                  <Button type="primary" icon={<EditOutlined />}>Edit Cake</Button>
                </Link>
              ) : (
                <Button type="primary" onClick={addCakeToCart} icon={<ShoppingCartOutlined />}>
                  Add to Cart
                </Button>
              )
            }
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Card>
          <Typography.Text>Price:</Typography.Text>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            {cake.price} €
          </Typography.Title>
        </Card>
        <Card>
          <Typography.Text>Preperation time:</Typography.Text>
          <Typography.Title
            level={3}
            style={{
              margin: 0,
            }}
          >
            {cake.preperationTime} hrs.
          </Typography.Title>
        </Card>
      </Col>
    </Row>
  );
}

export default CakeDetailsPage;
