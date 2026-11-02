import Logo from "./Logo";
import Nav from "./Nav";
import FollowUs from "./FollowUs";
import Flag from "../assets/flagIslander.png"

function Footer() {
    return (
        <div className="bg-[#9FA659]">
            <div className="
                bg-[url('./assets/banner.png')] 
                bg-cover bg-center"
            >
                <div className="bg-black/70">
                    <div className="
                        max-w-6xl 
                        mx-auto 
                        flex items-center 
                        gap-10 
                        px-8 
                        py-8"
                    >

                        <img src={Flag} alt="Flag" className="w-50 h-auto shrink-0" />
                        <div className="max-w-3xl">
                            <p className="
                                text-white 
                                text-lg 
                                text-center 
                                font-extrabold 
                                tracking-wide  
                                leading-loose
                                shadow-2xl
                                ">
                                Back to the Bush Koalas, Ltd endeavours to respectfully look after the land.
                                In the spirit of reconciliation and honour, we acknowledge the Traditional
                                Custodians of the land—the Giabal, Jarowair, and Jagera peoples.
                                We respect and honour Aboriginal and Torres Strait Islander Elders past and present.
                                We acknowledge the stories, traditions, and living cultures of Aboriginal and Torres
                                Strait Islander peoples on this land and commit to working with all peoples to ensure
                                better health for the koala population of our area.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <a
                    href="mailto:info@backtothebushkoalas.com.au"
                    className="text-white text-2xl underline">
                    info@backtothebushkoalas.com.au
                </a>
            </div>
            <div className="flex items-center justify-between shadow ">
                <Logo />
                <Nav />
                <FollowUs />
            </div>
            <div className="text-center bg-[#797641]">
                <span className="text-white"> © 2026, Back to the Bush Koalas, Ltd. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer;