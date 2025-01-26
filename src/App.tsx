import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import MainLayout from './components/layout/MainLayout'
import { Login } from './pages/auth/Login'
import Register from './pages/auth/Register'
import History from './pages/history/History'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import TopUp from './pages/topup/TopUp'
import Transaction from './pages/transaction/Transaction'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="service/:serviceCode" element={<Transaction />} />
          <Route path="topup" element={<TopUp />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
