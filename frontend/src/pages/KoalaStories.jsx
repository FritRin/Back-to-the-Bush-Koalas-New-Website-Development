import Link from "react-router-dom"
function KoalaStories(){
    return(
        <div className="pageContainer">
            <h1>
                Koala Success Stories
            </h1>
            <div className="koalaStoryBox">
                <img src="" alt="" />
                <h3>Koala Story 1</h3>
                <p>Koala story text content</p>
                <li>
                    <Link to="/koalaStoryTitle">Read More</Link>
                </li>
            </div>
            <div className="koalaStoryBox">
                <img src="" alt="" />
                <h3>Koala Story 2</h3>
                <p>Koala story text content</p>
                <li>
                    <Link to="/koalaStoryTitle">Read More</Link>
                </li>
            </div>
            <div className="koalaStoryBox">
                <img src="" alt="" />
                <h3>Koala Story 3</h3>
                <p>Koala story text content</p>
                <li>
                    <Link to="/koalaStoryTitle">Read More</Link>
                </li>
            </div>
        </div>
    )
}

export default KoalaStories;