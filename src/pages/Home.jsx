import { useEffect } from "react"
import Layout from "../components/Layout"

const Home = () => {
  const [products, setProducts] = useState([])

  const fetchingProducts = async () => {
    try {
      await fetch("https://backend-k64w.onrender.com/products")
      const dataProducts = await response.json()
      setProducts(dataProducts.data)
    } catch (e) {
    }
  }

  useEffect(() => {
    fetchingProducts
  }, [])

  return (
    <Layout>
      <div className="page-banner">Nuestros Productos</div>

      <section className="page-section">
        <p>
          Bienvenido a nuestra tienda. Aqui encontraras una amplia variedad de productos diseñados para satisfacer tus necesidades. Nuestro compromiso es ofrecer calidad y confianza.
        </p>
      </section>

      <section className="products-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>Precio:</strong> ${p.price}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoria:</strong> {p.category}</p>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Home