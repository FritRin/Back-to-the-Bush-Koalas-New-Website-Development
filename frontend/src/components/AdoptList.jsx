import { useEffect, useState } from "react";
import { getAllKoalas } from "../api/Koala";
import FormPopUp from "./FormPopUp";

function AdoptList() {
    const [Koalas, setKoalas] = useState([]);
    const [showForm, setShowForm] = useState(false);
    // Selected koalas information
    const [selectedKoala, setSelectedKoala] = useState(null);
    const [expandedKoala, setExpandedKoala] = useState(null);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

                {Koalas.map((koala) => (
                    <div
                        key={koala.koala_id}
                        className="
                            flex
                            min-h-64
                            bg-[#9FA659] 
                            shadow-sm border 
                            border-slate-200 
                            rounded-lg 
                            overflow-visible
                            transition-all
                            duration-200
                            ease-in-out
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <div className="w-1/2 shrink-0 self-stretch rounded-l-lg overflow-hidden">
                            <img
                                src={koala.image_url}
                                alt={koala.koala_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="relative flex min-w-0 flex-1 flex-col p-2">
                            
                            <div className="text-lg font-bold leading-tight mb-3 text-white">
                                Meet {koala.koala_name}
                            </div>

                            <div className={`rounded-lg bg-[#EEF2DB] p-3 shadow-inner ${
                                expandedKoala === koala.koala_id
                                    ? "absolute top-[44px] left-2 right-2 z-10 min-h-40"
                                    : "min-h-[170px]"
                            }`}>
                                <div className={`text-sm leading-tight text-left text-gray-700 ${
                                    expandedKoala === koala.koala_id ? "" : "line-clamp-7"
                                }`}>
                                    {koala.description}
                                </div>
                                
                                {koala.description.length > 180 && (
                                    <button
                                        onClick={() => setExpandedKoala(
                                            expandedKoala === koala.koala_id ? null : koala.koala_id 
                                        )}
                                        className="mt-2 text-sm font-bold text-green-800 hover:text-green-900 hover:underline underline-offset-2 cursor-pointer transition-colors duration-200" 
                                    >
                                        {expandedKoala === koala.koala_id ? "Read less" : "Read more"}
                                    </button>
                                )}
                            </div>
                              
                            <div className="text-base font-bold leading-tight mb-1 mt-auto text-white">
                                AU$50
                            </div>

                            <button
                                onClick = {() => {
                                    setSelectedKoala(koala);
                                    setShowForm(true);
                                }}
                                className="w-full rounded-lg bg-green-700 hover:bg-green-800 py-2 font-bold text-white">
                                Adopt Now
                            </button>
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