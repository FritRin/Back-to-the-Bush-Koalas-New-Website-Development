import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home"
import OurStory from "../pages/OurStory"
import OurFacilities from "../pages/OurFacilities"
import OurAchievements from "../pages/OurAchievements"
import Donate from "../pages/Donate"
import ContactUs from "../pages/ContactUs"
import Emergency from "../pages/Emergency"

//Sub-pages
import KoalaStories from "../pages/KoalaStories";
import AdoptKoala from "../pages/AdoptKoala";
import Wishlist from "../pages/Wishlist";

//Login & Admin Panel pages
import LoginLayout from "../layouts/LoginLayout"
import Login from "../pages/Login"
import AdminPanelLayout from "../layouts/AdminPanelLayout"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminManageKoalas from "../pages/admin/AdminManageKoalas";


function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="our-facilities" element={<OurFacilities />} />

        <Route path="our-achievements">
          <Route index element={<OurAchievements />} />
          <Route
            path="koala-success-stories"
            element={<KoalaStories />}
          />
        </Route>

        <Route path="/donate">
          <Route index element={<Donate />} />
          <Route path="adopt-a-koala" element={<AdoptKoala />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route path="contact-us" element={<ContactUs />} />
        <Route path="emergency" element={<Emergency />} />
      </Route>

      {/* Login */}
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminPanelLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="manage-koalas" element={<AdminManageKoalas/>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;