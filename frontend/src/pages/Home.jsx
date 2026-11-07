import '../index.css';
import { Link } from "react-router-dom";
import hospitalPhoto from "../assets/KoalaHospital.JPG"

function Home(){
    return(
        <div className="pageContainer">
            <div className="homeHeading">
                <h1>Home</h1>
            </div>
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
            <h2 className="aboutUsHeading">Our Vision</h2>
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
                <p className="aboutUsText2">Content</p>
            </div>
            <h3 className="aboutUsSubHeading">The Regional Need</h3>
            <div className="aboutUsText">
                <p className="aboutUsText1">Content</p>
                <img src={hospitalPhoto} className="aboutUsImg1"></img>
            </div>
            <h3 className="aboutUsSubHeading">The Regional Solution</h3>
            <div className="aboutUsText">
                <img src={hospitalPhoto} className="aboutUsImg2"/>
                <p className="aboutUsText2">Content</p>
            </div>
            <div className="statisticPanel">
                <div className="statisticDiv">
                    <h1 className="statisticDiv">Number</h1>
                    <h4 className="statisticDiv">Statistic</h4>
                </div>
                <div className="statisticDiv">
                    <h1 className="statisticDiv">Number</h1>
                    <h4 className="statisticDiv">Statistic</h4>
                </div>
                <div className="statisticDiv">
                    <h1 className="statisticDiv">Number</h1>
                    <h4 className="statisticDiv">Statistic</h4>
                </div>
            </div>
        </div>
    )
}

export default Home;