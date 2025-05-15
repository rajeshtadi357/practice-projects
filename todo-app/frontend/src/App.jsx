import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home, AuthPage } from './pages/pages'
import { useRecoilValue } from 'recoil'
import { authState } from './store/state'

function App() {
  const userLoggedIn = useRecoilValue(authState)

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Simple Todo App</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={userLoggedIn ? <Home /> : <Navigate to={'/auth'} />}
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


