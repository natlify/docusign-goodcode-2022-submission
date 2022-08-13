import { useRef } from "react"
import { useSelector, useStore } from "react-redux"
import { Navigate } from "react-router-dom"

const OnlyGuest = ({ children }) => {
  const store = useStore()
  const isLoggedIn = useSelector(store.select.user.isAuthed)

  return isLoggedIn ? <Navigate to="/app" replace /> : children
}

export default OnlyGuest
