import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import OurStory from "../pages/OurStory";
import OurFacilities from "../pages/OurFacilities";
import OurAchievements from "../pages/OurAchievements";
import Donate from "../pages/Donate";
import ContactUs from "../pages/ContactUs";
import Emergency from "../pages/Emergency";
import Story from "../pages/Story";

// Sub-pages
import KoalaStories from "../pages/KoalaStories";
import AdoptKoala from "../pages/AdoptKoala";
import Wishlist from "../pages/Wishlist";

// Login & Admin Panel pages
import ProtectedRoute from "../components/ProtectedRoute";
import LoginLayout from "../layouts/LoginLayout"
import Login from "../pages/Login"
import AdminPanelLayout from "../layouts/AdminPanelLayout"
import DonationsOverview from "../pages/admin/DonationsOverview";
import WebsiteTrafficOverview from "../pages/admin/WebsiteTrafficOverview";
import AdminManageKoalas from "../pages/admin/AdminManageKoalas";
import AdminManageStories from "../pages/admin/AdminManageStories";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Website */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="story/:id" element={<Story />} />
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
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminPanelLayout />}>
          <Route index element={<DonationsOverview />} />
          <Route path="website-traffic" element={<WebsiteTrafficOverview />} />
          <Route path="manage-koalas" element={<AdminManageKoalas />} />
          <Route path="manage-stories" element={<AdminManageStories />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;