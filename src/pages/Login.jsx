import { useContext } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

function LoginPage() {

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const onFinish = (values) => {
    const {email, password} = values;
    authService.login({email, password})
    .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();    
        navigate('/');                                 
    })
    .catch(console.error)
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
    <Row justify="center" align='middle'>
      <Col>
        <Card title="Please login to continue">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div>
              <p>If you don't have an account yet, you can create your account <Link to={'/sign-up'}>here</Link></p>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default LoginPage;