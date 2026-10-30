//import css
import { Outlet } from "react-router-dom";
import Link from "react-router-dom";

function OurCommunity(){
    return(
        <div>
            <h1>Our Achievements</h1>
            <Outlet/>
            <div>
                <ul className="">
                    <li>
                        <Link to="/KoalaStories">Koala Success Stories</Link>
                    </li>
                </ul>
            </div>
            <div className="achievementsPageContent">
                <h2>Heading</h2>
                <p>Page content TBD</p>
            </div>
        </div>
    )
}

export default OurCommunity;
