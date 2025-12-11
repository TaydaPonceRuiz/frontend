import { useEffect, useState } from "react"
import Layout from "../components/Layout"

const Home = () => {
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(true)

  const fetchingProducts = async () => {
    try {
      const response = await fetch("https://backend-k64w.onrender.com/products", {
        method: "GET"
      })
      const dataProducts = await response.json()
      setProducts(dataProducts.data.reverse())
    } catch (e) {
      console.log(" Error al traer los productos :(")
    }
  }

  useEffect(() => {
    fetchingProducts
  }, [])

  const deleteProduct = async (idProduct) => {
    if (confirm("estas seguro de que quieres borrar el producto")) {
      return
    }
    try {
      const response = await fetch(`https://backend-k64w.onrender.com/products/${idProduct}`, {
        method: "DELETE"
      })
      const dataResponse = await response.json

      setProducts(products.filter((p) => p._id !== idProduct))

      alert(`${dataResponse.data.name} borrando con exito`)
    } catch (error) {
    }
  }

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
            <button>Actualizar</button>
            {user && <button onClick={() => deleteProduct(p._id)}>Borrar</button>}
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Home