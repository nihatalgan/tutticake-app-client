import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import SignUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import MyAccountPage from "./pages/MyAccount";

import CakeListPage from "./pages/cakepages/CakeListPage";
import CakeDetailsPage from "./pages/cakepages/CakeDetailsPage";
import AddCake from "./pages/cakepages/AddCake";
import EditCakePage from "./pages/cakepages/EditCakePage";

import OrderDetailsPage from "./pages/orderpages/OrderDetailsPage";
import OrderSuccesssPage from "./pages/orderpages/OrderSuccesssPage";
import OrderListPage from "./pages/orderpages/OrderListPage";

import "./App.css";

function App() {
  const { Footer, Content } = Layout;

  return (
    <Layout>
      <Navbar />

      <Content
        style={{
          padding: "16px 24px",
          height: "calc(100vh - 128px)",
          overflowY: "auto",
          marginRight: "6px",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />

          <Route path="/cakes" element={<CakeListPage />} />
          <Route path="/cakes/create" element={<AddCake />} />
          <Route path="/cakes/:cakeId" element={<CakeDetailsPage />} />
          <Route path="/cakes/edit/:cakeId" element={<EditCakePage />} />

          <Route path="/order/cart" element={<OrderDetailsPage />} />
          <Route path="/order/success" element={<OrderSuccesssPage />} />
          <Route path="/order/list" element={<OrderListPage />} />

          <Route path="*" element={<h3>404 - Not Found</h3>} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        TuttiCake ©{new Date().getFullYear()} Created Burak & Ensha
      </Footer>
    </Layout>
  );
}

export default App;
