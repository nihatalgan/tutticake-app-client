import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import AddProject from "../components/AddProject";
import CakeCard from "../../components/CakeCard";
import { AuthContext } from "../../context/auth.context";
import { Button, Col, Row, Spin, Typography } from "antd";

const API_URL = "http://localhost:3000";

function CakeListPage() {
  const [cakes, setCakes] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const getAllCakes = () => {
    axios
      .get(`${API_URL}/cakes`)
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
          <Col span={6} key={cake._id}>
            <CakeCard {...cake} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CakeListPage;
