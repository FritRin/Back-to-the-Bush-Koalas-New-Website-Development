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
                    <p className="contactUsBox">Info</p>
                    <p className="contactUsBox">Info</p>
                    <p className="contactUsBox">Etc</p>
                </div>
                <div className="contactUsBox">
                    <p className="contactUsBox">For more information email:</p>
                    <a href="mailto:info@backtothebushkoalas.com.au" className="contactUsBox">info@backtothebushkoalas.com.au</a>
                </div>
                <div className="contactUsBox">
                    <p className="contactUsBox">Follow Us</p>
                </div>
            </div>
            <div className="faq">
                <h1 className="faq">Frequently Asked Questions</h1>
                <button type="button" className="faqButton">Why are we just treating koalas instead of all wildlife?</button>
                 <div className="faqContent">
                    <p>
                        Wildlife hospitals operate within finite constraints, including available veterinary staff, treatment space, enclosure capacity, food supply and species-specific resources. 
                        These constraints can influence which animals can be accommodated and the treatment options available for individual cases. By creating dedicated capacity specifically for koalas,
                        Back to the Bush Koalas can help ensure that more koalas receive timely veterinary treatment and the extended rehabilitation they require. Our focus is therefore not about treating 
                        fewer species—it is about doing one thing exceptionally well, filling a significant gap in regional wildlife care, and increasing the overall capacity of the wildlife rehabilitation 
                        network.
                    </p>
                </div>
                <button type="button" className="faqButton">Question</button>
                 <div className="faqContent">
                    <p>Content</p>
                </div>
                <button type="button" className="faqButton">Question</button>
                 <div className="faqContent">
                    <p>Content</p>
                </div>
            </div>
            
        </div>
    )
}

export default ContactUS;