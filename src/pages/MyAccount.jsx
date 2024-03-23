import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  Row,
  Spin,
  Upload,
  notification,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

import usersService from "../services/users.service";

import { Link } from "react-router-dom";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function MyAccountPage() {
  const [loading, setLoading] = useState(true);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [notify, notifyHolder] = notification.useNotification();

  useEffect(() => {
    usersService
      .getUserDetails()
      .then((response) => {
        setFormInitialValues(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
  }, []);

  const onFinish = (values) => {
    if (values.imageObj && values.imageObj[0]) {
      values.imageUrl = values.imageObj[0].response.image;
    }
    usersService
      .editUserDetails(values)
      .then((response) => {
        setLoading(true);
        usersService
          .getUserDetails()
          .then((response) => {
            setFormInitialValues(response.data);
            setLoading(false);
            notify["success"]({
              message: "Account Details Updated!",
              description:
                "Your account details has been updated successfully.",
              duration: 2,
            });
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          });
      })
      .catch((error) => {
        setLoading(false);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const uploadProps = {
    name: "image",
    listType: "picture",
    multiple: false,
    maxCount: 1,
    action: `${import.meta.env.VITE_SERVER_URL}/upload`,
  };

  if (loading) {
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col>
          <Spin size="large" />
        </Col>
        {notifyHolder}
      </Row>
    );
  }

  return (
    <Row justify="center" align="middle">
      <Col span={8}>
        <Card title="My Account">
          <Form
            name="account"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={formInitialValues}
          >
            <Flex justify="space-between">
              {formInitialValues.imageUrl ? (
                <Image
                  preview={false}
                  style={{ height: 96, width: 96, borderRadius: "50%" }}
                  src={formInitialValues.imageUrl}
                />
              ) : (
                <Avatar size={96} icon={<UserOutlined />} />
              )}
              <Form.Item
                label="Upload a Picture"
                name="imageObj"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Update</Button>
                </Upload>
              </Form.Item>
            </Flex>
            <Divider />
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input.TextArea />
            </Form.Item>
            <Row gutter={[16, 0]}>
              <Col>
                <Form.Item>
                  <Link>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Link>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Link to="/order/list">
                    <Button type="primary" htmlType="submit">
                      My Previous Orders
                    </Button>
                  </Link>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </Card>
      </Col>
      {notifyHolder}
    </Row>
  );
}

export default MyAccountPage;
