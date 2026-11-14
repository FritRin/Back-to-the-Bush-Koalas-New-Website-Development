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
                <form>
                    <div className="formInput">
                        <input
                        type="text"
                        defaultValue={"First Name*"}
                        maxLength={20}
                        required
                        />
                    </div>
                    <div className="formInput">
                        <input
                        type="text"
                        defaultValue={"Last Name*"}
                        maxLength={20}
                        required
                        />
                    </div>
                    <div className="formInput">
                        <input
                        type="email"
                        defaultValue={"Email Address*"}
                        maxLength={50}
                        required
                        />
                    </div>
                    <div className="formInput">
                        <input
                        type="tel"
                        defaultValue={"Phone*"}
                        maxLength={20}
                        required
                        />
                    </div>
                    <div className="formMessage">
                        <input
                        type="textarea"
                        defaultValue={"Message*"}
                        required
                        />
                    </div>
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
                        Back to the Bush Koalas can help ensure that more koalas receive timely veterinary treatment and the extended rehabilitation they require. Our focus is therefore not about treating 
                        fewer species—it is about doing one thing exceptionally well, filling a significant gap in regional wildlife care, and increasing the overall capacity of the wildlife rehabilitation 
                        network.
                    </p>
                </Collapsible>
                <Collapsible label="Why are we just treating koalas instead of all wildlife?" className="faqButton">
                    <p className="faqContent">
                        Wildlife hospitals operate within finite constraints, including available veterinary staff, treatment space, enclosure capacity, food supply and species-specific resources. 
                        These constraints can influence which animals can be accommodated and the treatment options available for individual cases. By creating dedicated capacity specifically for koalas,
                        Back to the Bush Koalas can help ensure that more koalas receive timely veterinary treatment and the extended rehabilitation they require. Our focus is therefore not about treating 
                        fewer species—it is about doing one thing exceptionally well, filling a significant gap in regional wildlife care, and increasing the overall capacity of the wildlife rehabilitation 
                        network.
                    </p>
                </Collapsible>
                <Collapsible label="Why are we just treating koalas instead of all wildlife?" className="faqButton">
                    <p className="faqContent">
                        Wildlife hospitals operate within finite constraints, including available veterinary staff, treatment space, enclosure capacity, food supply and species-specific resources. 
                        These constraints can influence which animals can be accommodated and the treatment options available for individual cases. By creating dedicated capacity specifically for koalas,
                        Back to the Bush Koalas can help ensure that more koalas receive timely veterinary treatment and the extended rehabilitation they require. Our focus is therefore not about treating 
                        fewer species—it is about doing one thing exceptionally well, filling a significant gap in regional wildlife care, and increasing the overall capacity of the wildlife rehabilitation 
                        network.
                    </p>
                </Collapsible>
            
        </div>
    )
}

export default ContactUS;