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
                    <p className="emergencyNumber">RSPCA Wacol (Koalas and all other injured wildlife)</p>
                    <a href="tel:1300264625" className="emergencyNumber">1300 ANIMAL (1300 264625)</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Kiara Hill (Toowoomba and Highfields region)</p>
                    <a href="tel:0448876176" className="emergencyNumber">0448 876 176</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">High Country Koala Action Group Inc (Crows Nest region)</p>
                    <a href="tel:0437734556" className="emergencyNumber">0437 734 556</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Trish LeeHong:</p>
                    <a href="tel:0407028540" className="emergencyNumber">0407 028 540</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Pryde Wildlife (Lockyer Valley and Somerset regions)</p>
                    <a href="tel:0400256656" className="emergencyNumber">0400 256 656</a>
                </div>
                <div className="emergencyNumber">
                    <p className="emergencyNumber">Trudi Timbs (Fernvale and Sommerset regions)</p>
                    <a href="tel:0412541611" className="emergencyNumber">0412 541 611</a>
                </div>
            </div>
        </div>
    )
}

export default Emergency;