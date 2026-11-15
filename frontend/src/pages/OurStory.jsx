import kristin from "../assets/Kristin.JPG"
import timP from "../assets/TimPortasreal.jpg"
import jenny from "../assets/jennybttb.jpg"
import bernadette from "../assets/Bernadettenewphoto.jpg"
import timD from "../assets/Timdoust.JPG"
import rochelle from "../assets/Rochelle.jpg"
import ourStoryPhoto from "../assets/OurStoryPhoto.jpg"

function OurStory(){
    return(
        <div className="pageContainer">
            <h1 className="ourStoryHeading">Our Story</h1>
            <div className="ourStoryHistory">
                <h2 className="ourStoryHistory">Our History</h2>
                <div className="ourStoryContainer">
                    <img src={ourStoryPhoto} alt="example image" className="ourStoryHistory"/>
                    <p className="ourStoryHistory">
                        During the devastating fire season of 2019/2020, Dr. Kristin Doust was working as a full-time wildlife veterinarian with a strong interest in koalas. 
                        She had begun to care for orphaned koalas at this time, and as the number of orphans grew, she and her husband Timothy began to build koala enclosures. Resting just south of Toowoomba 
                        on an idyllic 26-acre block of land, Back to the Bush Koalas Ltd has been helping sick, injured, and orphaned koalas for seven years. During this time, we have helped over 70 orphaned 
                        or injured koalas successfully be released into the wild. As our passion and commitment grew, we realised the best way to ensure a future for these animals was to give each koala the 
                        best chance by having a hospital in this region. The creation of our Not For Profit charity has allowed other like-minded individuals sharing a love for koalas and the environment to 
                        come together for a common goal.
                    </p>
                </div>
            </div>
            <div className="boardOfDirectors">
                <h2 className="boardOfDirectors">Meet our Board of Directors</h2>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Kristin Doust,</h2>
                        <h3>Doctor of Veterinary Medicine - Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={kristin} alt="Kristin Doust's Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Dr. Doust has been a practicing veterinarian for 25 years, much of that spent in emergency medicine. She has been doing koala medicine for 7 years and has been a certified rehabilitation 
                            practitioner for 10 years. She has worked with 3 different koala hospitals and maintains relationships with other prominent koala veterinarians across Queensland and New South Wales. 
                            As a Director, Kristin brings the medical knowledge and veterinary expertise, as well as koala husbandry knowledge. Her advanced rehabilitation skills have already allowed many 
                            injured koalas to return to the wild. Kristin is passionate about ensuring the survival of these endangered animals as well as ensuring Back to the Bush Koalas, Ltd become a
                            pivotal koala hospital in the Toowoomba region.
                        </p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Tim Portas,</h2>
                        <h3>BVSc, MVSc, MANZCVS (Zoo), DACZM - Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={timP} alt="Tim Portas' Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Tim Portas is board-certified zoological veterinarian with 29 years of clinical experience, including over 26 years working exclusively in the fields of zoological 
                            and conservation medicine. He has held senior veterinary roles in leading zoological institutions and directed clinical teams in high-volume wildlife hospitals and 
                            consulted on national and international conservation and wildlife research programs. He has authored or co-authored over 50 peer-reviewed papers, book chapters, 
                            and technical reports is a co-editor of Current Therapy in Medicine of Australian Mammals (CSIRO, 2019 and 2025). He has extensive experience working with threatened 
                            and endangered species including Australian marsupials such as koalas, bettongs, quolls and rock-wallabies.
                        </p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Jenny Harrison,</h2>
                        <h3>Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={jenny} alt="Jenny Harrison's Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Jenny Harrison brings extensive executive-level experience from the Australian Public Service to Back to the Bush Koalas Ltd. With a strong background 
                            in quality assurance, audits, project management, policy writing, and tender management, Jenny has successfully led initiatives across both for-profit 
                            and not-for-profit sectors. As a board member, she leverages her strategic planning and operational expertise to enhance the efficiency and effectiveness 
                            of Back to the Bush Koalas Ltd. Although new to wildlife conservation, Jenny is passionate about making a difference in koala care and preservation. 
                            In her free time, Jenny enjoys walking, traveling, and spending time with her grandchildren. 
                        </p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Bernadette Brady,</h2>
                        <h3>Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={bernadette} alt="Bernadette Brady's Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Bernadette brings skills acquired in diverse areas of Health to Back to the Bush Koalas Ltd.Her career evolved from clinical care to a mixture 
                            of change management, systems redesign work in the health field, experience-based design, consultant, research assistant and volunteer with a 
                            not-for-profit patient and family centred organisation. Whilst building on a knowledge base developed over a substantial period, in the provision 
                            of direct health care services, her focus was always on understanding how patients, their families and staff experience health care delivery. Bernadette 
                            has had a lifelong love of koalas developed during times in the bush where she went to sleep with the sound of koalas. Bernadette has already developed a 
                            3-year history with Back to the Bush Koalas Ltd and understands the goals and purpose of the organisation. 
                        </p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Timothy Doust,</h2>
                        <h3>Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={timD} alt="Timothy Doust's Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Timothy has been an integral part of Back to the Bush Koalas Ltd since its creation in 2019. Prior to this, he lived in the USA for 20 years, running 
                            a successful building/contracting company. This required him to be adaptable with living and working in a different legal environment. In addition to 
                            excelling in management and organization of large building projects, he has successfully managed employees and served on boards of many different 
                            organizations. Most recently, Timothy has been responsible for running a small business here in Queensland with high financial and ethical standards as 
                            a director. Tim has vast experience in koala handling, as well as building koala enclosures. He has been the instigator and leader for the koala fodder 
                            plantation development here at Back to the Bush Koalas Ltd, and continues to be active in the tree planting community here. He brings enthusiasm and vast 
                            knowledge to the role as director for Back to the Bush Koalas Ltd. 
                        </p>
                    </div>
                </div>
                <div className="directorIntro">
                    <div className="director">
                        <h2>Rochelle Davis,</h2>
                        <h3>Director</h3>
                    </div>
                    <div className="directorContent">
                        <img src={rochelle} alt="Rochelle Davis' Profile Photo" className="directorPhoto"/>
                        <p className="directorContentText">
                            Rochelle is currently completing her Bachelor of Veterinary Science (Honours) at the University of Queensland. She holds a bachelor's degree with Honours 
                            in Ecology and Conservation Biology, where she developed a strong passion for animal welfare and environmental conservation. Rochelle has previously worked 
                            for a nonprofit wildlife rescue, where she gained valuable hands-on experience and basic training in wildlife rescue operations. She plans on using her veterinary 
                            degree to continue working with wildlife.  Additionally, she has experience in the field of law specializing in common place law, which has provided depth to 
                            her professional experience. She is excited to bring her knowledge to contribute to Back to the Bush Koalas Ltd.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStory;