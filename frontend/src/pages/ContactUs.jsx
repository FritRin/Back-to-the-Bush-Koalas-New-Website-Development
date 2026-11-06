function ContactUS(){
    return(
        <div className="pageContainer">
            <div className="contactUsHeading">
                <h1 className="contactUsHeading">Contact Us</h1>
            </div>
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
                <button type="button" className="faqButton">Question</button>
                 <div className="faqContent">
                    <p>Content</p>
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