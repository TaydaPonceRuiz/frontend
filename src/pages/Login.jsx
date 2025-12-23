import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleSubmit = (e) => {
    e.preventDeafult
    login()
    navigateUser("/")
  }

  return (
    <Layout>
      <div className="center-auth">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Iniciar Sesion</h3>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Contraseña" required />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login