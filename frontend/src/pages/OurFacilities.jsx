import hospitalView from "../assets/Hospitalview.jpg"
import hospitalProperty from "../assets/Hospitalproperty.jpg"
import enclosureInfo from "../assets/enclosureinfo.jpeg"
import enclosurePhoto1 from "../assets/Enclosure2.jpg"
import enclosurePhoto2 from "../assets/Enclosure3.jpeg"

function OurFacilities(){
    return(
        <div className="pageContainer">
            <h1 className="ourHospitalHeading">Our Koala Hospital</h1>
            
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">With over 7 years of building koala enclosures and planting trees, this facility will:</h3>
            </div>
            <div className="ourHospitalTextContent">
                    <li className="ourHospitalTextContent">Be the only wildlife hospital in the SEQ region with an on-site veterinarian available 24/7.</li>
                    <li className="ourHospitalTextContent">Integrate seamlessly with the existing rehabilitation centre.</li>
                    <li className="ourHospitalTextContent">Significantly increase survival and release rates for local koalas due to the convenient location and overnight veterinary assessment available.</li>
            </div>
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">Completed Milestones:</h3>
            </div>
            <div className="ourHospitalTextContent">
                    <li className="ourHospitalTextContent">Not for Profit DGR status, any donation over $2.00 is tax deductible in Australia.</li>
                    <li className="ourHospitalTextContent">A 12 x 12 metre building for the hospital with Change of Material Use and engineering approved by Council, complete with water and electricity.</li>
                    <li className="ourHospitalTextContent">Multiple proven koala enclosures for various stages of development and activity levels.</li>
                    <li className="ourHospitalTextContent">A pre-release plantation with 39 full sized feed trees to ensure orphans gain complete independence before release.</li>
                    <li className="ourHospitalTextContent">Climate controlled Chlamydial ward with an insulated roof designed to comfortably and safely house infectious koalas undergoing treatment while allowing them to have fresh outdoor sights, and smells.</li>
                    <li className="ourHospitalTextContent">Grants and Donations have allowed us to acquire much of our medical equipment and cages. We have a state-of-the-art Ultrasound machine, digital X-ray equipment, Critical care units, microscope, and other important diagnostic equipment. </li>
            </div>
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">This project is already 50% complete. We are now seeking strategic partners to support the final stages of development including</h3>
            </div>
            <div className="ourHospitalTextContent">
                    <li className="ourHospitalTextContent">Fit-out works of the existing building to meet all Veterinary Surgeons Board of Queensland criteria for veterinary hospitals.</li>
                    <li className="ourHospitalTextContent">Purchase of remaining medical equipment and consumables to run a state-of-the-art koala hospital.</li>
                    <li className="ourHospitalTextContent">Operating costs including salaries for critical personnel and on-going building maintenance.</li>

            </div>

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