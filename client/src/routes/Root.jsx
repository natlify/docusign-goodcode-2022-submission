import { Route, Routes } from "react-router-dom"
import App from "../App"
import AppLayout from "../layouts/AppLayout/Shell"
import ImageGallery from "../pages/ImageGallery"
import LandingPage from "../pages/LandingPage"
import UserErrorPage from "../pages/error/UserErrorPage"
import GuestOrApiErrorPage from "../pages/error/GuestOrApiErrorPage"

const Root = () => {
    return (  
    <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<ImageGallery />} />
            <Route path="*" element={<UserErrorPage />} />
        </Route>
         <Route path="*" element={<GuestOrApiErrorPage/>} />
      </Routes>
    )
}

export default Root