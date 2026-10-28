import { Outlet } from "react-router-dom";

function Donate(){
    return(
        <div>
            <h1>Donate</h1>
            <Outlet/>
        </div>
    )
}

export default Donate;