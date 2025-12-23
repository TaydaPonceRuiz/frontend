import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext()

// user -> true | false
// login() -> setUser(true)
// logout() -> setUser(false)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false)

  const login = () => setUser(true)
  const logout = () => setUser(false)

  // const handleStateUser = () => setUser(prev => !prev)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }