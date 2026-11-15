import Collapsible from "./collapsible.jsx";

function OurFacilitiesMobile(){
    return(
        <div>
            <Collapsible className="ourHospitalInfoBox" label="With over 7 years of building koala enclosures and planting trees, this facility will:">
                <li className="ourHospitalTextContent">Be the only wildlife hospital in the SEQ region with an on-site veterinarian available 24/7.</li>
                <li className="ourHospitalTextContent">Integrate seamlessly with the existing rehabilitation centre.</li>
                <li className="ourHospitalTextContent">Significantly increase survival and release rates for local koalas due to the convenient location and overnight veterinary assessment available.</li>
            </Collapsible>
            <Collapsible className="ourHospitalInfoBox" label="Completed Milestones:">
                <li className="ourHospitalTextContent">Not for Profit DGR status, any donation over $2.00 is tax deductible in Australia.</li>
                <li className="ourHospitalTextContent">A 12 x 12 metre building for the hospital with Change of Material Use and engineering approved by Council, complete with water and electricity.</li>
                <li className="ourHospitalTextContent">Multiple proven koala enclosures for various stages of development and activity levels.</li>
                <li className="ourHospitalTextContent">A pre-release plantation with 39 full sized feed trees to ensure orphans gain complete independence before release.</li>
                <li className="ourHospitalTextContent">Climate controlled Chlamydial ward with an insulated roof designed to comfortably and safely house infectious koalas undergoing treatment while allowing them to have fresh outdoor sights, and smells.</li>                        <li className="ourHospitalTextContent">Grants and Donations have allowed us to acquire much of our medical equipment and cages. We have a state-of-the-art Ultrasound machine, digital X-ray equipment, Critical care units, microscope, and other important diagnostic equipment. </li>
            </Collapsible>
            <Collapsible className="ourHospitalInfoBox" label="This project is already 50% complete. We are now seeking strategic partners to support the final stages of development including">
                <li className="ourHospitalTextContent">Fit-out works of the existing building to meet all Veterinary Surgeons Board of Queensland criteria for veterinary hospitals.</li>
                <li className="ourHospitalTextContent">Purchase of remaining medical equipment and consumables to run a state-of-the-art koala hospital.</li>
                <li className="ourHospitalTextContent">Operating costs including salaries for critical personnel and on-going building maintenance.</li>
            </Collapsible>
        </div>
    )
}

export default OurFacilitiesMobile;