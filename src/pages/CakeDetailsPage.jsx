import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";

import cakeServices from "../services/cakes.service";
import { AuthContext } from "../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:3000";

function CakeDetailsPage(props) {
  const { user } = useContext(AuthContext);

  const [cake, setCake] = useState({});
  const { cakeId } = useParams();

  const getCake = () => {
    cakeServices
      .getCakeDetails(cakeId)
      .then((response) => {
        const oneCake = response.data;
        setCake(oneCake);
      })
      .catch((error) => console.log(error));
  };

  const addCakeToCard = () => {
    axios
      .post(`${API_URL}/order/addcake/${cakeId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCake();
  }, []);

  return (
    <Row gutter={[24, 0]}>
      <Col span={16}>
        <Image width={"100%"} src={cake.imageUrl} preview={false} />
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
            {cake && cake.vendor && user && cake.vendor._id === user._id && (
              <Link to={`/cakes/edit/${cakeId}`}>
                <Button type="primary">Edit Cake</Button>
              </Link>
            )}
          </Col>
          <Col>
            <Link to={`/cakes/edit/${cakeId}`}>
              <Button type="primary" onClick={addCakeToCard}>
                Add to Card
              </Button>
            </Link>
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
