import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home"
import OurStory from "../pages/OurStory"
import OurFacilites from "../pages/OurFacilities"
import OurCommunity from "../pages/OurCommunity"
import Donate from "../pages/Donate"
import ContactUs from "../pages/ContactUs"
import Emergency from "../pages/Emergency"

//Sub-pages
import Volunteer from "../pages/Volunteer";
import KoalaStories from "../pages/KoalaStories";
import SchoolEng from "../pages/SchoolEng";
import TreePlantingEng from "../pages/TreePlantingEng";
import AdoptKoala from "../pages/AdoptKoala";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/our-story-and-inspection" element={<OurStory />} />
        <Route path="/our-facilities-and-location" element={<OurFacilites />} />

        <Route path="/our-community" element={<OurCommunity />}/>
          {/* Sub-pages */}
        <Route path="/volunteer-quotes" element={<Volunteer />} />
        <Route path="/koala-success-stories" element={<KoalaStories />} />
        <Route path="/school-engagements" element={<SchoolEng />} />
        <Route path="/tree-planting-engagements" element={<TreePlantingEng />} />
        

        <Route path="/donate" element={<Donate />}/>
          {/* Sub-pages */}
        <Route path="/adopt-a-koala" element={<AdoptKoala />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/emergency" element={<Emergency />} />

      </Route>
    </Routes>
  );
}

export default AppRoutes;