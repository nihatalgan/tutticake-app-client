import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Row, notification } from "antd";

import usersService from "../services/users.service";

function MyAccountPage() {

  const [loading, setLoading] = useState(true);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [notify, notifyHolder] = notification.useNotification();


  useEffect(() => {
    usersService.getUserDetails()
    .then((response) => {
      setFormInitialValues(response.data);
      setLoading(false);
    })
    .catch(error => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
      setLoading(false);
    })
  }, [])

  const onFinish = (values) => {
    const { name, email, phoneNumber, address } = values;
    usersService.editUserDetails({ name, email, phoneNumber, address })
    .then((response) => {
      notify['success']({
        message: 'Account Details Updated!',
        description:
          'Your account details has been updated successfully.',
        duration: 2,
      })
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })    
  };

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <Row justify="center" align='middle'>
      <Col>
        <Card title="My Account">
          <Form
            name="account"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={formInitialValues}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>
              <Form.Item
              label="Phone Number"
              name="phoneNumber"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        { errorMessage  && <p style={{color: 'red', textAlign: "center"}}>{errorMessage}</p>}
        </Card>
      </Col>
      {notifyHolder}
    </Row>
  )
}

export default MyAccountPage;
