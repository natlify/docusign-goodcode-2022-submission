import { Route, Routes } from "react-router-dom"
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
import DocuSignEvents from "../pages/DocuSignEvents"
import Auth from "../pages/Auth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { supabase } from "../utils/supabase"
import SignOut from "../pages/SignOut"
import RequireAuth from "./RequireAuth"
import OnlyGuest from "./OnlyGuest"

const Root = () => {
  const dispatch = useDispatch()
  const user = useSelector((root) => root.user)
  useEffect(() => {
    dispatch.user.initAuth()
    supabase.auth.onAuthStateChange(() => {
      dispatch.user.initAuth()
    })
  }, [])
  useEffect(() => {
    dispatch.user.setServerCookie()
    if (user?.email && user.accepted_cp === false) {
      // eslint-disable-next-line no-undef
      docuSignClick.Clickwrap.render(
        {
          environment: "https://demo.docusign.net",
          accountId: "77c8b115-51ee-4f06-9979-ca9e73968e8e",
          clickwrapId: "a2a6a91f-131e-4d48-b15a-0bb7bfdd0d96",
          clientUserId: user.id,
          documentData: {
            email: user.email,
          },
        },
        "#ds-clickwrap",
      )

      supabase
        .from("profile")
        .update({ accepted_cp: true })
        .match({ id: user.id })
        .then((data) => console.log(data))
    }
  }, [user])

  return (
    <Routes>
      <Route
        index
        element={
          <OnlyGuest>
            <LandingPage />
          </OnlyGuest>
        }
      />
      <Route path="auth" element={<Auth />} />
      <Route path="auth/logout" element={<SignOut />} />
      <Route
        path="app"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route index element={<ImageGallery />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="schedules" element={<Schedule />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="admin-iam" element={<Identity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="successful-verification" element={<DocuSignEvents />} />
        <Route path="*" element={<UserErrorPage />} />
      </Route>
      <Route path="*" element={<GuestOrApiErrorPage />} />
    </Routes>
  )
}

export default Root
