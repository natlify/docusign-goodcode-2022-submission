import { Route, Routes } from "react-router-dom"
import App from "../App"
import AppLayout from "../layouts/AppLayout/Shell"
import ImageGallery from "../pages/ImageGallery"
import LandingPage from "../pages/LandingPage"
import UserErrorPage from "../pages/error/UserErrorPage"
import GuestOrApiErrorPage from "../pages/error/GuestOrApiErrorPage"
import Dashboard from "../pages/Dashboard"
import Analytics from "../pages/Analytics"
import Settings from "../pages/Settings"
import Identity from "../pages/Identity"
import Contacts from "../pages/Contacts"
import Schedule from "../pages/Schedule"
import DocuSignEvents from "../pages/DocuSignEvents";
import Auth from "../pages/Auth";
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { supabase } from "../utils/supabase"
import SignOut from "../pages/SignOut"

const Root = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch.user.initAuth()
    supabase.auth.onAuthStateChange(() => {
      dispatch.user.initAuth()
    })
  }, [])

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="auth" element={<Auth />} />
      <Route path="auth/logout" element={<SignOut />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<ImageGallery />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="schedules" element={<Schedule />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="admin-iam" element={<Identity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="successful-verification" element={<DocuSignEvents />} />
        <Route path="*" element={<UserErrorPage />} />
      </Route>
      <Route path="*" element={<GuestOrApiErrorPage />} />
    </Routes>
  )
}

export default Root