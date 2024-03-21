import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import AddProject from "../components/AddProject";
import CakeCard from "../../components/CakeCard";
import { AuthContext } from "../../context/auth.context";
import { Col, Row, Spin } from "antd";

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
            <button>Create a cake</button>
          </Link>
        ) : (
          <p>Please signin to sell or buy cakes.</p>
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
