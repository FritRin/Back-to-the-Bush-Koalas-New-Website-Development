import { FaSquareFacebook } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
function FollowUs() {
    return (
        <div className="flex flex-col items-center mr-4">
            <span className="text-white text-4xl font-black">
                Follow Us
            </span>

            <div className="flex gap-8 mt-4">
                <FaSquareFacebook className="text-white text-5xl" />
                <PiInstagramLogoFill className="text-white text-5xl" />
            </div>
        </div>
    )
}

export default FollowUs;