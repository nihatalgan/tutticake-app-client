import { Card, Flex, Typography } from "antd";

function OrderSuccesssPage() {
  return (
    <Flex gap="middle" align="center" justify="center" vertical style={{ height: "100%" }}>
      <Card style={{ width: '550px' }}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Thank you </Typography.Title>
        <Typography.Text>
          Your booking has been confirmed. Your order is already on the way ...
          Thanks for using Tutticake.com
        </Typography.Text>
      </Card>
    </Flex>
  );
}

export default OrderSuccesssPage;
