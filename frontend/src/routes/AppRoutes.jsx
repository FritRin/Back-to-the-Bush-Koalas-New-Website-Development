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
import TreePlantingEng from "../pages/TreePlantingEng";
import AdoptKoala from "../pages/AdoptKoala";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/our-facilities" element={<OurFacilites />} />

        <Route path="/our-achievements" element={<OurAchievements />}/>
          {/* Sub-pages */}
        <Route path="/koala-success-stories" element={<KoalaStories />} />
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