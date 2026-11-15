import Collapsible from "../components/collapsible.jsx"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IconContext } from "react-icons";

function ContactUS(){
    return(
        <div className="pageContainer">
            <h1 className="contactUsHeading">Contact Us</h1>
            <p className="contactForm">Ask a Question (all queries are sent to our email)</p>
            <div className="contactForm">
                <form className="contactForm">
                    <label className="contactForm">First Name*</label>
                        <input
                        type="text"
                        maxLength={20}
                        required
                        className="formInput"
                        />
                    <label className="contactForm">Last Name*</label>
                        <input
                        type="text"
                        maxLength={20}
                        required
                        className="formInput"
                        />
                    <label className="contactForm">Email Address*</label>
                    
                        <input
                        type="email"
                        maxLength={50}
                        required
                        className="formInput"
                        />
                    <label className="contactForm">Phone*</label>
                    
                        <input
                        type="tel"
                        maxLength={20}
                        required
                        className="formInput"
                        />
                    <label className="contactForm">Message*</label>
                        <input
                        type="textarea"
                        required
                        className="formMessage"
                        />
                </form>
            </div>
            <div className="contactUsPanel">
                <div className="contactUsBox">
                    <li className="contactUsBox">Established: <p>2019</p></li>
                    <li className="contactUsBox">Incorporated Not-For-Profit: <p>8/05/2024</p></li>
                    <li className="contactUsBox">ABN: <p>93 677 191 865</p></li>
                    <li className="contactUsBox">Type: <p>Company</p></li>
                    <li className="contactUsBox">Constitution</li>
                    
                </div>
                <div className="contactUsBox">
                    <p className="contactUsBox">For more information email:</p>
                    <a href="mailto:info@backtothebushkoalas.com.au" className="contactUsBox">info@backtothebushkoalas.com.au</a>
                </div>
                <div className="contactUsBox">
                    <p className="contactUsSocMedia">Follow Us</p>
                    <div className="contactUsSocMedia">
                        <IconContext.Provider value={{className: "socMediaIcon" }}>
                            <FaFacebookSquare />
                        </IconContext.Provider>
                        <IconContext.Provider value={{className: "socMediaIcon" }}>
                            <FaInstagram />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
                <h1 className="faq">Frequently Asked Questions</h1>
                <Collapsible label="Why are we just treating koalas instead of all wildlife?" className="faqButton">
                    <p className="faqContent">
                        Wildlife hospitals operate within finite constraints, including available veterinary staff, treatment space, enclosure capacity, food supply and species-specific resources. 
                        These constraints can influence which animals can be accommodated and the treatment options available for individual cases. By creating dedicated capacity specifically for koalas,
                        Back to the Bush Koalas can help ensure that more koalas receive timely veterinary treatment and the extended rehabilitation they require. </p>
                        <p className="faqContentBold">
                            Our focus is therefore not about treating fewer species—it is about doing one thing exceptionally well, filling a significant gap in regional wildlife care, and increasing the overall 
                            capacity of the wildlife rehabilitation network.</p>
                    
                </Collapsible>
                <Collapsible label="What milestones have been reached for the building of this hospital?" className="faqButton">
                    <p className="faqContent">
                        We have successfully obtained a Material Change of Use Permit by our local council. Engineering of the building has been completed. We are in the process of securing a Lease 
                        Agreement between the Doust Family and Back to the Bush Koalas, Ltd to ensure that the future of the hospital is safe and secure. 
                    </p>
                </Collapsible>
                <Collapsible label="How will you staff a veterinarian 24/7 as a sustainable model when none of the other wildlife hospitals can offer this?" className="faqButton">
                    <p className="faqContent">
                        Initially, we have our onsite veterinarian, Dr. Doust, availble to triage cases even in the middle of the night. This is the advantage of this location. We recognize that this is NOT 
                        sustainable and have incorporated additional veterinarian shifts into our Financial Plan.</p>
                        <p className="faqContent">The 24/7 model is therefore based on onsite emergency capability, appropriate rostering, a pool of 
                        supporting veterinarians and a dedicated single-species caseload, rather than relying on one veterinarian to provide continuous care. This approach allows Back to the Bush Koalas to provide a 
                        level of overnight veterinary access that is currently difficult for larger, multi-species wildlife facilities to sustain.</p> 
                        <p className="faqContent">As the hospital grows, we intend to develop a structured veterinary workforce 
                        that may include relief veterinarians, experienced wildlife clinicians and, ultimately, internship or early-career positions for veterinarians seeking specialised experience in wildlife medicine. This 
                        will create a pathway for developing the next generation of wildlife veterinarians while strengthening the hospital's long-term staffing capacity.</p>
                </Collapsible>
            
        </div>
    )
}

export default ContactUS;