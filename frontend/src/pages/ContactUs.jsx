function ContactUS(){
    return(
        <div className="pageContainer">
            <h1>Contact Us</h1>
            <div className="contactForm">
                <form>
                    <label>Ask a Question (all queries are sent to our email)</label>
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
                    <div className="formInput">
                        <input
                        type="textarea"
                        defaultValue={"Message*"}
                        required
                        />
                    </div>
                </form>
            </div>
            <div className="contactUsBox">
                <p>Info</p>
                <p>Info</p>
                <p>Etc</p>
            </div>
            <div className="contactUsBox">
                <p>For more information email:</p>
                <a href="mailto:info@backtothebushkoalas.com.au">info@backtothebushkoalas.com.au</a>
            </div>
            <div className="contactUsBox">
                <p>Follow Us</p>
            </div>
            <div className="faq">
                <button type="button" className="faqButton">Question</button>
                 <div>
                    <p>Content</p>
                </div>
                <button type="button" className="faqButton">Question</button>
                 <div>
                    <p>Content</p>
                </div>
                <button type="button" className="faqButton">Question</button>
                 <div>
                    <p>Content</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUS;