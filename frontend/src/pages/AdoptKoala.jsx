import KoalaTest from "../components/KoalaTest";
function AdoptKoala(){
    return(
        <div className="pageContainer">
            <h1>Adopt A Koala</h1>

            {/* component to re use many times The KoalaTest alredy have style */}
            <KoalaTest
            name="mimi"
            description="A koala story abc123abc123 test test test"
            />

            <KoalaTest
            name="coco"
            description="A koala story abc123abc123 test test test"
            />

            <KoalaTest
            name="ricky"
            description="A koala story abc123abc123 test test test"
            />

        </div>
    )
}

export default AdoptKoala;