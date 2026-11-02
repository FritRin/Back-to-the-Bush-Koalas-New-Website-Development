import { FaSquareFacebook } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
function FollowUs() {
    return (
        <div className="flex flex-col items-center mr-4">
            <span className="text-white text-4xl font-black">
                Follow Us
            </span>

            <div className="flex gap-8 mt-4">
                <a href="https://www.facebook.com/people/Back-to-the-Bush-koala-rehab/100072434361386/?mibextid=wwXIfr&rdid=UY1YjcbxHlj0YbMD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Y6HwZJzX8%2F%3Fmibextid%3DwwXIfr%20">
                    <FaSquareFacebook className="text-white text-5xl" />
                </a>
                <a href="https://www.instagram.com/back_to_the_bush_koalas/#%20">
                    <PiInstagramLogoFill className="text-white text-5xl" />
                </a>
            </div>
        </div>
    )
}

export default FollowUs;