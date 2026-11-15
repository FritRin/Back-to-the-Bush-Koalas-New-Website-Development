import hospitalView from "../assets/Hospitalview.jpg";
import hospitalProperty from "../assets/Hospitalproperty.jpg";
import enclosureInfo from "../assets/enclosureinfo.jpeg";
import enclosurePhoto1 from "../assets/Enclosure2.jpg";
import enclosurePhoto2 from "../assets/Enclosure3.jpeg";
import { useMediaQuery } from "react-responsive";
import OurFacilitiesMobile from "../components/OurFacilitiesMobile.jsx";
import OurFacilitiesDekstop from "../components/OurFacilitiesDesktop.jsx";

function OurFacilities(){
    const isTabletOrMobile = useMediaQuery({maxWidth: 768 });
    return(
        <div className="pageContainer">
            <h1 className="ourHospitalHeading">Our Koala Hospital</h1>
            {isTabletOrMobile ? <OurFacilitiesMobile /> : <OurFacilitiesDekstop />}
            <h2 className="ourLocationTextContent">Our Location - Upper Flagstone</h2>
            <p>
                Our facility is in a naturally quiet environment in Upper Flagstone, insulated from city noises and pollution and surrounded by natural bush. This idyllic setting will be conducive to the 
                well-being of long-term patients by providing a low stress healing environment. Just on the southern edge of Toowoomba, our location is a closer alternative for koalas in the Granite Belt, 
                Darling Downs, and Toowoomba region, as well as stretching north of Toowoomba towards Esk.
            </p>

            <h2 className="ourLocationTextContent">Our Infrastructure</h2>
            <li className="ourHospitalTextContent">12x12 metre building with Change of Material Use Permit approved and ready for internal fit out </li>
            <li className="ourHospitalTextContent">Outdoor chlamydial ward designed for up to 8 koalas</li>
            <li className="ourHospitalTextContent">4 Specialised rehabilitation enclosures for long-term injuries</li>
            <li className="ourHospitalTextContent">Kindy Tree enclosures</li>
            <li className="ourHospitalTextContent">Pre-release plantation with 38 large koala feed trees</li>
            <li className="ourHospitalTextContent">Onsite koala fodder trees-over 2000 planted thus far.</li>
            
            <img src={hospitalView} alt="Koala Hospital Site" className="ourHospitalMainImage"/>
            <div className="ourHospitalGallery">
                <img src={hospitalProperty} alt="Hospital Property" className="ourHospitalGalleryHorizontal"/>
                <img src={enclosureInfo} alt="Enclosure without koalas" className="ourHospitalGalleryHorizontal"/>
                <img src={enclosurePhoto1} alt="Enclosure with koalas 1" className="ourHospitalGalleryVertical"/>
                <img src={enclosurePhoto2} alt="Enclosure with koalas 2" className="ourHospitalGalleryVertical"/>
            </div>
        </div>
    )
}

export default OurFacilities;