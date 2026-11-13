import '../index.css';
import { Link } from "react-router-dom";
import hospitalPhoto from "../assets/KoalaHospital.JPG"

function Home(){
    return(
        <div className="pageContainer">
            <h1 className="homeHeading">Answering the need for a full-service koala hospital serving the Toowoomba and surrounding regions.</h1>
            <div className="storyPanel">
                <div className="featuredStory">
                    <img src={hospitalPhoto} alt="example image" className="featuredStory"></img>
                    <ul>
                        <li>
                            <Link to="">
                            <h1 className="featuredStory">Featured Story</h1></Link>
                        </li>
                    </ul>
                </div>
                <div className="storySubPanel">
                    <div className="storyContainer">
                        <img src={hospitalPhoto} alt="example image" className="storyContainer"></img>
                        <h2 className="storyContainer">Story 1</h2>
                    </div>
                    <div className="storyContainer">
                        <img src={hospitalPhoto} alt="example image" className="storyContainer"></img>
                        <h2 className="storyContainer">Story 2</h2>
                    </div>
                    <div className="storyContainer">
                        <img src={hospitalPhoto} alt="example image" className="storyContainer"></img>
                        <h2 className="storyContainer">Story 3</h2>
                    </div>
                    <div className="storyContainer">
                        <img src={hospitalPhoto} alt="example image" className="storyContainer"></img>
                        <h2 className="storyContainer">Story 4</h2>
                    </div>
                </div>
            </div>
            <div className="homeHeadingBox">
                <h2 className="homeHeadingBox">Who We Are</h2>
            </div>
            <h3 className="homeIntroduction">
                Back to the Bush Koalas, Ltd is an established not-for-profit koala rehabilitation centre serving the Toowoomba and Lockyer Valley region. Our on-site veterinarian specialises in treating and rehabilitating injured and orphaned koalas. Our focus is on successfully 
                releasing koalas back into the wild.
            </h3>
            <h2 className="aboutUsHeading">Our Vision: Working to ensure the future of koalas in the wild.</h2>
            <div className="aboutUsText">
                <p className="aboutUsText1">
                    Our purpose is to establish and sustainably operate a dedicated regional koala hospital providing 24/7 veterinary treatment and rehabilitation services in an under-served area. 
                    Back to the Bush Koalas Ltd is developing this hospital on a quiet 26-acre property on the southern edge of Toowoomba. With over seven years of rehabilitating injured and orphaned koalas, we already have substantial infrastructure completed. 
                    This hospital will serve the Toowoomba/Lockyer Valley/ Sommerset/Granite Belt regions, offering a closer option of high-quality care for these iconic animals.
                </p>
                <img src={hospitalPhoto} className="aboutUsImg1"></img>
            </div>

            <h3 className="aboutUsSubHeading">The Problem and our Important Niche</h3>
            <div className="aboutUsText">
                <img src={hospitalPhoto} className="aboutUsImg2"/>
                <p className="aboutUsText2">
                    Koalas injured or requiring veterinary treatment in the Toowoomba and surrounding regions must currently face lengthy transport of 2 or more hours to 
                    approved wildlife hospitals. Further, veterinary assessment is not usually available overnight, leaving an injured koala without triage and pain medicine 
                    for up to 12 hours. In a severely injured animal, this costly time can be the difference of life or death. Additionally, the local wildlife rescue groups 
                    have the added stress and cost of having to transport animals up to two or more hours to the nearest facility.
                </p>
            </div>
            <p className="aboutUsTextBold">
                    Our regional koalas need access to timely veterinary care when it matters most. Being able to offer immediate full-service care to koalas here will be a 
                    paramount step for the local populations' survival.  
            </p>
            <h3 className="aboutUsSubHeading">The Regional Need</h3>
            <div className="aboutUsText">
                <p className="aboutUsText1">
                    Working with all the local koala rescuers, we have gathered rescue data for the past seven years. We anticipate seeing between 300-500 koalas each year at 
                    our hospital, saving countless hours of driving by local wildlife rescuers.  Areas we will serve include Warwick, Stanthorpe, Toowoomba, Highfields, Crows Nest, 
                    Gatton, and Sommerset.
                </p>
                <img src={hospitalPhoto} className="aboutUsImg1"></img>
            </div>
            <h3 className="aboutUsSubHeading">The Regional Solution</h3>
            <div className="aboutUsText">
                <img src={hospitalPhoto} className="aboutUsImg2"/>
                <p className="aboutUsText2">
                    Back to the Bush Koalas has already launched our initiative to operate a full-service koala hospital. We provide a complimentary regional facility rather 
                    than competing with existing hospitals. Because we only see koalas in this region, other wildlife hospitals can continue to offer exceptional care for all other 
                    wildlife as well as their regional koalas. We will offer:
                    <li className="aboutUsList">Veterinary treatment available 24/7 for koalas</li>
                    <li className="aboutUsList">Emergency care </li>
                    <li className="aboutUsList">Diagnostic imaging</li>
                    <li className="aboutUsList">Surgery</li>
                    <li className="aboutUsList">Hospitalisation</li>
                    <li className="aboutUsList">Chlamydial treatment and vaccination</li>
                    <li className="aboutUsList">Rehabilitation</li>
                    <li className="aboutUsList">Pre-release conditioning</li>
                    <li className="aboutUsList">Conservation research and partnerships</li>
                </p>
            </div>
            <div className="statisticPanel">
                <div className="statisticDiv">
                    <h1 className="statisticDiv">70</h1>
                    <h4 className="statisticDiv">Koalas rehabilitated and released</h4>
                </div>
                <div className="statisticDiv">
                    <h1 className="statisticDiv">2000</h1>
                    <h4 className="statisticDiv">Trees planted for koala fodder on-site</h4>
                </div>
                <div className="statisticDiv">
                    <h1 className="statisticDiv">2500</h1>
                    <h4 className="statisticDiv">Trees planted for koala fodder in the community</h4>
                </div>
            </div>
        </div>
    )
}

export default Home;