import { useState } from "react";
import Legacy from "../assets/Legacy.JPG"

const faqs = [
    {
        question: "HOW DO I MAKE A BEQUEST?",
        answer:"For specific advice about your will or estate planning needs you should consult a professional legal advisor",
    },
];

function Bequest() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[500px] bg-cover bg-top"
                style={{
                    backgroundImage: `url(${Legacy})`,
                }}
            >
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute left-12 top-1/2 z-10 -translate-y-1/2 ">
                    <span className="text-9xl font-bold text-white ">
                        Leave A Legacy
                    </span>
                </div>
            </section>

            {/* Content Section */}
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 lg:grid-cols-2">

                    {/* Left Column */}
                    <div>
                        <div className="space-y-4">
                            <p>
                                By remembering Back to the Bush Koalas in your will, you will enhance the future survival rate of our regional koalas.
                            </p>
                            <p>
                                Back to the Bush Koalas is dedicated to providing timely treatment for injured/ill koalas in this
                                region. As their long-term survival depends on organisations like ours, our long term
                                survival depends on the visions and generosity of people like you.
                            </p>
                            <p>
                                Your legacy will help fund the ongoing work of Back to the Bush 
                                Koalas to care for our koalas during their most vulnerable times. 
                                It will help fund ongoing critical 24/7 vet access and
                                professional care.
                            </p>
                            <p>
                                Your gift will help us plan and respond to koala needs with confidence.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - FAQ */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-xl border border-gray-200"
                                >
                                    <button
                                        className="flex w-full items-center justify-between p-4 text-left text-3xl font-semibold"
                                        onClick={() =>
                                            setOpenIndex(
                                                openIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                    >
                                        {faq.question}

                                        <span>
                                            {openIndex === index
                                                ? "−"
                                                : "+"}
                                        </span>
                                    </button>

                                    {openIndex === index && (
                                        <p className="border-t  p-4">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
export default Bequest;