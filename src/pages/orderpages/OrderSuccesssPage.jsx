import { Card, Col, Row, Typography } from "antd";

function OrderSuccesssPage() {
  return (
    <Row align="middle" justify="center" style={{ height: "100%" }}>
      <Col xs={24} sm={24} md={18} lg={16} xl={12} xxl={10}>
        <Card style={{ maxWidth: '550px' }}>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>Thank you </Typography.Title>
          <Typography.Text>
            Your booking has been confirmed. Your order is already on the way ...
            Thanks for using Tutticake.com
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderSuccesssPage;
