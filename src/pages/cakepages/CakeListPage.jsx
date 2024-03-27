import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cakeServices from "../../services/cakes.service";
import CakeCard from "../../components/CakeCard";
import { AuthContext } from "../../context/auth.context";
import { Button, Col, Row, Spin, Typography } from "antd";

const API_URL = "http://localhost:3000";

function CakeListPage() {
  const [cakes, setCakes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getAllCakes = () => {
    cakeServices
      .getAllCakes()
      .then((response) => {
        setCakes(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCakes();
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
      <div className="cake-listing-topbar">
        {isLoggedIn ? (
          <Link to="/cakes/create">
            <Button type="primary" size='large'>Create a cake</Button>
          </Link>
        ) : (
          <Typography.Title level={3} style={{ margin: 0 }} type="secondary">Please signin to sell or buy cakes.</Typography.Title>
        )}
      </div>
      <Row gutter={[16, 16]}>
        {cakes.map((cake) => (
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6} key={cake._id}>
            <CakeCard {...cake} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CakeListPage;
