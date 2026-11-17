import { useEffect, useState } from "react";
import { getAllKoalas } from "../api/Koala";
import FormPopUp from "./FormPopUp";

function AdoptList() {
    const [Koalas, setKoalas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    // Selected koalas information
    const [selectedKoala, setSelectedKoala] = useState(null);

    useEffect(() => {
        const loadKoalas = async () => {
            try {
                const data = await getAllKoalas();
                setKoalas(data);
            } catch (error) {
                console.error("Error loading Adopt Koala list:", error);
            }
        };

        loadKoalas();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {Koalas.map((koala) => (
                    <div
                        key={koala.koala_id}
                        className="
                        bg-[#9FA659] 
                        shadow-sm border 
                        border-slate-200 
                        rounded-lg 
                        overflow-hidden 
                        transition-opacity 
                        duration-300 
                        hover:scale-110"
                    >
                        <div className="flex flex-col sm:flex-row ">
                            <div className="sm:w-full h-80">
                                <img
                                    src={`http://localhost:3000${koala.image_url}`}
                                    alt={koala.koala_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-2 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-white">
                                        Meet {koala.koala_name}
                                    </h3>

                                    <div className="bg-[#EEF2DB]">
                                        <p className="text-gray-700">
                                            {koala.description}
                                        </p>
                                        <span> Status: {koala.status}</span>
                                    </div>
                                </div>

                                <div className="text-white">
                                    <p className="text-3xl font-bold mb-2">
                                        AU$50
                                    </p>

                                    <button
                                        onClick = {() => {
                                            setSelectedKoala(koala);
                                            setShowForm(true);
                                        }}
                                        className="w-full bg-green-700 hover:bg-green-800 py-2 font-bold">
                                        Adopt Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FormPopUp
            // Show the form once clicked on Adopt, gather the information of the selected koala, and set donationType to adoption so that it will be set at $50.
                open = {showForm}
                close = {() => {
                    setShowForm(false);
                    setSelectedKoala(null);
                }}
                donationType = "adoption"
                selectedKoala = {selectedKoala}
            />
        </div>
    );
}

export default AdoptList;