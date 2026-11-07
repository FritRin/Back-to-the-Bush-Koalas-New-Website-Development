import hospital from "../assets/KoalaHospital.JPG"
function OurFacilities(){
    return(
        <div className="pageContainer">
            <h1 className="ourHospitalHeading">Our Koala Hospital</h1>
            
            <img src={hospital} alt="Koala Hospital Site" className="ourHospitalMainImage"/>
            <div className="ourHospitalGallery">
                <img src={hospital} alt="example image" className="ourHospitalGallery"/>
                <img src={hospital} alt="example image" className="ourHospitalGallery"/>
                <img src={hospital} alt="example image" className="ourHospitalGallery"/>
                <img src={hospital} alt="example image" className="ourHospitalGallery"/>
            </div>
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">With over 7 years of building koala enclosures and planting trees, this facility will:</h3>
            </div>
            <div className="ourHospitalTextContent">
                <p className="ourHospitalTextContent">Sub-heading</p>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>
            </div>
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">Completed Milestones:</h3>
            </div>
            <div className="ourHospitalTextContent">
                <p className="ourHospitalTextContent">Sub-heading</p>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>
            </div>
            <div className="ourHospitalInfoBox">
                <h3 className="ourHospitalInfoBox">This project is already 50% complete. We are now seeking strategic partners to support the final stages of development including</h3>
            </div>
            <div className="ourHospitalTextContent">
                <p className="ourHospitalTextContent">Sub-heading</p>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>
                    <li className="ourHospitalTextContent">Info item</li>

            </div>
        </div>
    )
}

export default OurFacilities;