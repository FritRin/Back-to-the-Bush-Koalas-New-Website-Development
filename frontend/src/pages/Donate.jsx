import { Outlet } from "react-router-dom";

function Donate(){
    return(
        <div>
            <div className="wishlistButton">
                <a href="/Wishlist">Our Wishlist</a>
            </div>
            <div className="donateGrid">
                <div className="wishlistButton">
                    <a href="/Wishlist">Our Wishlist</a>
                </div>
                <div className="adoptButton">
                    <a href="/AdoptAKoala">Adopt A Koala</a>
                </div>
                <div className="donateButton">
                    <a href="#">Donate</a>    
                </div>  
            </div>
            <h2>Your support will help fund</h2>
            <Outlet/>
            <div className="donatePageTextContent">
                <p>Text Content</p>
            </div>
            <div className="donateInfoBox">
                <h3>Your donation will be a powerful message of hope, compassion, and a commitment to the future of koalas. Ways to Support Back to the Bush Koalas, Ltd</h3>
            </div>
            <div className="donateTextContent">
                <p>Text Content</p>
            </div>
            <div>
                <div className="directDepositHeader">
                    <h4>Direct Deposit (in Australia)</h4>
                    <div className="directDepositContent">
                        <p>Content</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Donate;