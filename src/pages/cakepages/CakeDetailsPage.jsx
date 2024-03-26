import { useState, useEffect, useContext } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import cakeServices from "../../services/cakes.service";
import orderServices from "../../services/order.service";
import { AuthContext } from "../../context/auth.context";
import { Row, Col, Image, Typography, Card, Divider, Button, List, Avatar, Flex, Rate, Form, Input, Spin } from "antd";
import { ArrowLeftOutlined, EditOutlined, ShoppingCartOutlined } from "@ant-design/icons";

function CakeDetailsPage(props) {
  const { user, setCartItemCount, isLoggedIn } = useContext(AuthContext);

  const [cake, setCake] = useState({});
  const [loading, setLoading] = useState(true);

  const { cakeId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const getCake = () => {
    setLoading(true);
    cakeServices
      .getCakeDetails(cakeId)
      .then((response) => {
        const oneCake = response.data;
        setCake(oneCake);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const onReviewFinish = (values) => {
    const { rating, comment } = values;
    const author = user._id;
    const cake = cakeId;
    cakeServices.addCakeReview({
      author,
      cake,
      comment,
      rating,
    }).then(() => {
      form.setFieldsValue({ comment: '', rating: 0});
      getCake();
    })
    .catch((error) => console.log(error));
  }

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
    <Row gutter={[24, 0]} align="top">
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
              isLoggedIn && cake.vendor._id === user._id && (
                <Link to={`/cakes/edit/${cakeId}`}>
                  <Button type="primary" icon={<EditOutlined />}>Edit Cake</Button>
                </Link>
              )
            }
            {
              isLoggedIn && cake.vendor._id !== user._id && (
                <Button type="primary" onClick={addCakeToCart} icon={<ShoppingCartOutlined />}>
                  Add to Cart
                </Button>
              )
            }
          </Col>
        </Row>
        <Divider />
        {
          isLoggedIn && cake.vendor._id !== user._id ? (
            <>
              <Form
                name="review"
                onFinish={onReviewFinish}
                autoComplete="off"
                layout="vertical"
                form={form}
              >
                <Typography.Title level={5}>Add Your Review:</Typography.Title>
                <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your rating!',
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>

                <Form.Item
                  label="Comment"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your comment!',
                    },
                  ]}
                >
                  <Input.TextArea rows={5}/>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit comment
                  </Button>
                </Form.Item>
              </Form>                

              <Divider />
            </>
          ) : null
        }
        <Typography.Title level={4}>
          Reviews
        </Typography.Title>
        <List
          bordered
          itemLayout="horizontal"
          dataSource={cake.reviews}
          renderItem={(item, index) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={
                  <Avatar src={item.author.imageUrl ? item.author.imageUrl : `https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                }
                title={<Flex align="baseline" justify="flex-start" gap={8}><Typography.Title level={5}>{item.author.name}</Typography.Title><Rate value={item.rating} disabled /><Typography.Text type="secondary">{new Date(item.createdAt).toLocaleString('en-UK')}</Typography.Text></Flex>}
                description={item.comment}
              />
            </List.Item>
          )}
        />
        <Divider />
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
