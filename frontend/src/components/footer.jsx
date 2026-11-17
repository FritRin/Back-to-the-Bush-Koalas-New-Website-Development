import Logo from "./Logo";
import NavDesktop from "./Nav";
import NavMobile from "./NavMobile";
import FollowUs from "./FollowUs";
import Flag from "../assets/flagIslander.png"
import { useMediaQuery } from "react-responsive";

function Footer() {
    const isTabletOrMobile = useMediaQuery({maxWidth: 768});
    return (
        <div className="bg-[#9FA659]">
            <div className="
                bg-[url('./assets/banner.png')] 
                bg-cover bg-center"
            >
                <div className="bg-black/80">
                    <div className="
                        max-w-6xl 
                        mx-auto 
                        flex items-center 
                        gap-10 
                        px-8 
                        py-8
                        max-md:flex-col"
                    >

                        <img src={Flag} alt="Flag" className="w-50 h-auto shrink-0" />
                        <div className="max-w-3xl">
                            <span className="
                                text-white 
                                text-lg 
                                text-center 
                                font-[1000]
                                tracking-wide  
                                leading-loose
                                text-shadow-lg/100
                                max-md:text-base
                                ">
                                Back to the Bush Koalas, Ltd endeavours to respectfully look after the land.
                                In the spirit of reconciliation and honour, we acknowledge the Traditional
                                Custodians of the land—the Giabal, Jarowair, and Jagera peoples.
                                We respect and honour Aboriginal and Torres Strait Islander Elders past and present.
                                We acknowledge the stories, traditions, and living cultures of Aboriginal and Torres
                                Strait Islander peoples on this land and commit to working with all peoples to ensure
                                better health for the koala population of our area.
                            </span>
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
            <div className="flex items-center justify-between shadow max-md:flex-col">
                <Logo />
                {isTabletOrMobile ? <NavMobile /> : <NavDesktop />}
                <FollowUs />
            </div>
            <div className="text-center bg-[#797641]">
                <span className="text-white"> © 2026, Back to the Bush Koalas, Ltd. All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer;