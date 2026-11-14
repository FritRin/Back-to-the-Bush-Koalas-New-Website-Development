import { useState } from "react";

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    return(
        <div>
            <button onClick={toggle} className="faqButton">{props.label}</button>
            {open && (
                <div className="faqContent">
                    {props.children}
                </div>
            )}
        </div>
    );
};

export default Collapsible;