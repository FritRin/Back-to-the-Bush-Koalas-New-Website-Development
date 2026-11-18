import { useRef } from "react";
import emailjs from '@emailjs/browser';
import { useState } from "react";

function ContactForm(){
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [formSubmissionStatus, setFormSubmissionStatus] = useState('notSubmitted');
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_zkjbiaj', 'template_bofyz6x', form.current, { publicKey: 'vg4RuI4iOgqso7oGY'}).then(() => {
            console.log('success');}, (error) => {console.log('failed...', error.text);},);
        setFName('');
        setLName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setFormSubmissionStatus('submitted');
    };
    return(
        <form ref={form} onSubmit={sendEmail} className="contactForm">
            <label className="contactForm">First Name*</label>
            <input type="text" name="fname" value={fname} onChange={(e) => setFName(e.target.value)} className="formInput" required />
            <label className="contactForm">Last Name*</label>
            <input type="text" name="lname" value={lname} onChange={(e) => setLName(e.target.value)} className="formInput" required />
            <label className="contactForm">Email*</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="formInput" required />
            <label className="contactForm">Phone*</label>
            <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="formInput" required />
            <label className="contactForm">Message*</label>
            <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="formMessage"  />
            <input type="submit" value="Send" className="formSubmit" />
            {formSubmissionStatus === 'submitted' && (
            <div className="contactForm">
                <h3>Thank you for your message and for supporting Back to the Bush Koalas! We will be sure to respond to your inquiry as soon as we can!</h3>
            </div>
            )}
        </form>
    );
};

export default ContactForm;