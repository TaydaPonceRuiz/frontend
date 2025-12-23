import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import UpdateProduct from "../components/UpdateProduct"
import { useAuth } from "../context/AuthContext"
import { CATEGORIES } from "../constants/categories"

const Home = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    name: "",
    stock: 0,
    category: "",
    minPrice: 0,
    maxPrice: 0
  })

  const { user } = useAuth()

  const fetchingProducts = async (query = "") => {
    try {
      const response = await fetch(`https://backend-k64w.onrender.com/products?${query}`, {
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

  const handleUpdateProduct = (p) => {
    console.log(p, "producto a actualizar")
    setSelectedProduct(p)
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.prevenDeFault()

    const query = new URLSearchParams()

    if (filters.name) query.append("name", filters.name)
    if (filters.stock) query.append("stock", filters.stock)
    if (filters.category) query.append("category", filters.category)
    if (filters.minPrice) query.append("minPrice", filters.minPrice)
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice)

    fetchingProducts(query.toString())
  }

  const handleResetFilters = () => {
    setFilters({
      name: "",
      stock: 0,
      category: "",
      minPrice: 0,
      maxPrice: 0
    })
  }

  return (
    <Layout>
      <div className="page-banner">Nuestros Productos</div>

      <section className="page-section">
        <p>
          Bienvenido a nuestra tienda. Aqui encontraras una amplia variedad de productos diseñados para satisfacer tus necesidades. Nuestro compromiso es ofrecer calidad y confianza.
        </p>
      </section>

      <section>
        <form className="filters-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Buscar por nombre"
            onChange={handleChange}
            value={filters.name}
          />
          <input
            type="number"
            name="stock"
            placeholder="Ingrese el stock"
            onChange={handleChange}
            value={filters.stock}
          />
          <select
            name="category"
            onChange={handleChange}
            value={filters.category}
          >
            <option selected> Todas las categorias</option>
            {
              CATEGORIES.map((category) =>
                <option key={category.id}
                  value={category.value}>{category.content}
                </option>
              )
            }
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Precio minimo"
            onChange={handleChange}
            value={filters.minPrice}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio maximo"
            onChange={handleChange}
            value={filters.maxPrice}
          />
          <button type="submit">Aplicar filtros</button>
          <button type="button" onClick={handleResetFilters}>Cancelar</button>
        </form>
      </section>

      {
        selectedProduct && <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={fetchingProducts}
        />
      }

      <section className="products-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>Precio:</strong> ${p.price}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoria:</strong> {p.category}</p>
            {
              user && <div className="cont-btn">
                <button onClick={() => handleUpdateProduct(p)}>Actualizar</button>
                <button onClick={() => deleteProduct(p._id)}>Borrar</button>
              </div>
            }
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Home