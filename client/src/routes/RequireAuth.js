import { useRef } from "react"
import { useSelector, useStore } from "react-redux"
import { Navigate } from "react-router-dom"

const RequireAuth = ({ children }) => {
  const store = useStore()
  const isLoggedIn = useSelector(store.select.user.isAuthed)

  return isLoggedIn ? children : <Navigate to="/auth" replace />
}

export default RequireAuth
