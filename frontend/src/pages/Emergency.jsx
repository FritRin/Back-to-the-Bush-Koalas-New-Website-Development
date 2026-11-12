import { IoIosLink } from "react-icons/io";
import { IconContext } from "react-icons";



function Emergency(){
    return(
        <div className="pageContainer">
            <div className="emergencyHeading">
                <h1 className="emergencyHeading">Found a koala in distress?</h1>
            </div>
            <div className="emergencySubtitle">
                <p>For sick injured or orphaned koalas in immediate need of assistance:</p>
            </div>
            <div className="emergencyNumberPanel">
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Org Name</p>
                    <a href="">
                        <IconContext.Provider value={{className: 'emergencyNumberLink'}}>
                            <IoIosLink />
                        </IconContext.Provider>
                    </a>
                    <a href="tel:#" className="emergencyNumber">phone number</a>
                </div>
            </div>
        </div>
    )
}

export default Emergency;