//import css
import Link from "react-router-dom";

function Home(){
    return(
        <div className="pageContainer">
            <h1>Home</h1>
            <div className="featuredStory">
                <img src="example.jpg" alt="example image"></img>
                <ul className="featuredStoryLink">
                    <li>
                        <Link to="">Featured Story</Link>
                    </li>
                </ul>
            </div>
            <div className="storyContainer">
                <img></img>
                <ul className="storyLink">
                    <li>
                        <Link to="">Story 1</Link>
                    </li>
                </ul>
            </div>
            <div className="storyContainer">
                <img></img>
                <ul className="storyLink">
                    <li>
                        <Link to="">Story 2</Link>
                    </li>
                </ul>
            </div>
            <div className="storyContainer">
                <img></img>
                <ul className="storyLink">
                    <li>
                        <Link to="">Story 3</Link>
                    </li>
                </ul>
            </div>
            <div className="storyContainer">
                <img></img>
                <ul className="storyLink">
                    <li>
                        <Link to="">Story 4</Link>
                    </li>
                </ul>
            </div>
            <div className="aboutUsText">
                <h2>Our Purpose</h2>
                <p>Content</p>
            </div>
            <div className="aboutUsImg">
                <img></img>
            </div>
            <div className="aboutUsText">
                <h2>Our Mission</h2>
                <p>Content</p>
            </div>
            <div className="aboutUsImg">
                <img></img>
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
            <div className="statisticDiv">
                <h1>Number</h1>
                <h4>Statistic</h4>
            </div>
            <div className="statisticDiv">
                <h1>Number</h1>
                <h4>Statistic</h4>
            </div>
            <div className="statisticDiv">
                <h1>Number</h1>
                <h4>Statistic</h4>
            </div>
        </div>
    )
}

export default Home;