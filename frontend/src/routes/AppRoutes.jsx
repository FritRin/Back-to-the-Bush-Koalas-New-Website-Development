import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home"
import OurStory from "../pages/OurStory"
import OurFacilites from "../pages/OurFacilities"
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

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/our-facilities" element={<OurFacilites />} />

        <Route path="/our-achievements" element={<OurAchievements />} />
        {/* Sub-pages */}
        <Route path="/koala-success-stories" element={<KoalaStories />} />


        <Route path="/donate" element={<Donate />} />
        {/* Sub-pages */}
        <Route path="/adopt-a-koala" element={<AdoptKoala />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/emergency" element={<Emergency />} />


      </Route>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AdminPanelLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;