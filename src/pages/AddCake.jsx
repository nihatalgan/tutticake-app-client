import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons"

import cakeServices from "../services/cakes.service";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function AddCake() {
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.imageObj && values.imageObj[0]) {
      values.imageUrl = values.imageObj[0].response.image;
    }
    cakeServices
      .addCake(values)
      .then((response) => {
        navigate("/cakes");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const uploadProps = {
    name: 'image',
    listType:"picture",
    multiple: false,
    maxCount: 1,
    action: `${import.meta.env.VITE_SERVER_URL}/upload`,
  };

  return (
    <Row justify="center" align='middle'>
      <Col span={16}>
        <Card title="Please add cake details">
          <Form
            name="add-cake"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item label="Upload Cake Picture" name="imageObj" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Cake Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input cake name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Cake Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input cake description!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Cake Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Please input cake price!',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Cake Preparation Time"
              name="preperationTime"
              rules={[
                {
                  required: true,
                  message: 'Please input cake preperation Time!',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          { errorMessage  && <p style={{color: 'red', textAlign: "center"}}>{errorMessage}</p>}
        </Card>
      </Col>
    </Row>
  );
}

export default AddCake;
