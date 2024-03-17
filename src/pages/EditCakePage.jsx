import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons"

import cakeServices from "../services/cakes.service";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function EditCakePage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [cakeData, setCakeData] = useState({});

  const { cakeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    cakeServices
      .getCakeDetails(cakeId)
      .then((response) => {
        setCakeData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [cakeId]);

  const onFinish = (values) => {
    if (values.imageObj && values.imageObj[0]) {
      values.imageUrl = values.imageObj[0].response.image;
    }
    cakeServices.editCakeDetails(cakeId, values)
      .then((response) => {
        navigate(`/cakes/${cakeId}`);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const deleteCake = () => {
    cakeServices
      .deleteCake(cakeId)
      .then(() => {
        navigate("/cakes");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
      });
  };
  
  const uploadProps = {
    name: 'image',
    listType:"picture",
    multiple: false,
    maxCount: 1,
    action: `${import.meta.env.VITE_SERVER_URL}/upload`,
  };

  if (loading) {
    return (
      <Row justify="center" align='middle' style={{ height: '100%' }}>
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    )
  }

  return (
    <Row justify="center" align='middle'>
      <Col span={16}>
        <Card title="Edit a cake">
          <Form
            name="edit-cake"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            initialValues={cakeData}
          >
            <Form.Item label="Upload Cake Picture" name="imageObj"  valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Update</Button>
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
                Save Changes
              </Button>
              <Button type="danger" onClick={deleteCake}>
                Delete Cake
              </Button>
            </Form.Item>
          </Form>
          { errorMessage  && <p style={{color: 'red', textAlign: "center"}}>{errorMessage}</p>}
        </Card>
      </Col>
    </Row>
  );
}

export default EditCakePage;
