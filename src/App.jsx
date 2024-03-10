import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'

import SignUpPage from './pages/Signup'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import MyAccountPage from './pages/MyAccount'

import './App.css'

function App() {
const { Footer, Content } = Layout;


  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '16px 24px', height: 'calc(100vh - 128px)', overflowY: 'auto', marginRight: '6px' }}>
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          
          <Route path="/my-account" element={<MyAccountPage/>} />

          <Route path="*" element={<h3>404 - Not Found</h3>} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        TuttiCake ©{new Date().getFullYear()} Created Burak & Ensha
      </Footer>
    </Layout>
  )
}

export default App
