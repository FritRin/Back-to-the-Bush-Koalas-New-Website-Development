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
            <div className="aboutUsText">
                <h2>Our Purpose</h2>
                <p>Content</p>
                <div className="aboutUsImg">
                <img src="example.jpg"></img>
            </div>
            </div>
            <div className="aboutUsText">
                <h2>Our Mission</h2>
                <p>Content</p>
                <div className="aboutUsImg">
                    <img></img>
                </div>
            </div>
            <div className="aboutUsText">
                <h2>The Problem and our Important Niche</h2>
                <p>Content</p>
            </div>
            <div className="aboutUsImg">
                <img></img>
            </div>
            <div className="aboutUsText">
                <h2>The Regional Need</h2>
                <p>Content</p>
            </div>
            <div className="aboutUsImg">
                <img></img>
            </div>
            <div className="aboutUsText">
                <h2>The Regional Solution</h2>
                <p>Content</p>
            </div>
            <div className="aboutUsImg">
                <img></img>
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