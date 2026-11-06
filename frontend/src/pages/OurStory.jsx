import hospital from "../assets/KoalaHospital.JPG"
function OurStory(){
    return(
        <div className="pageContainer">
            <h1 className="ourStoryHeading">Our Story</h1>
            <div className="ourStoryHistory">
                <h2 className="ourStoryHistory">Our History</h2>
                <div className="ourStoryContainer">
                    <img src={hospital} alt="example image" className="ourStoryHistory"/>
                    <p className="ourStoryHistory">Our history content</p>
                </div>
            </div>
            <div className="boardOfDirectors">
                <h2 className="boardOfDirectors">Meet our Board of Directors</h2>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Name -</h2>
                        <h3>Occupation Title</h3>
                    </div>
                    <div className="directorContent">
                        <img src={hospital} alt="example image" className="directorPhoto"/>
                        <p>Content</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory;