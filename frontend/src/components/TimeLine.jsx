import React, { useRef, useEffect } from "react";

const timelineEvents = [
  {
    year: "2019",
    title: "The little koala who started it all",
    description: "During the bushfire season, our first orphaned koala, Eddie, arrived here for care. Little did we know that this tiny koala would become the catalyst for everything Back to the Bush Koalas would eventually become.",
  },
  {
    year: "2020",
    title: "Growing our vision",
    description: "Our first fundraising campaign as Back to the Bush Koalas began. We established and fenced a plantation of 38 feed trees, creating a safe environment where orphaned koalas could develop essential skills needed for life in the wild.",
  },
  {
    year: "2020",
    title: "Expanding our care",
    description: "We completed two koala kindy enclosures and began caring for even more orphaned koalas, helping prepare them for their eventual return to the wild.",
  },
  {
    year: "2023",
    title: "A bigger dream takes shape",
    description: "We began conceptualising how Back to the Bush Koalas could grow beyond rehabilitation. We recognised the need for something more for the koalas of our region: a dedicated hospital offering comprehensive care.",
  },
  {
    year: "8 May 2024",
    title: "Officially incorporated",
    description: "Back to the Bush Koalas became an incorporated Not-For-Profit organisation, providing the foundation to pursue our larger vision and build a future for koalas across the region.",
  },
  {
    year: "2025",
    title: "The foundations for our hospital",
    description: "We received our Change of Material Use permit from local council, an important milestone toward making a dedicated regional hospital a reality.",
  },
];

export default function Timeline() {

  return (
    <section className=" overflow-visible">
      {/* Header */}
      <div className="py-1 md:py-1 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#496c49]">Our Journey</h2>
        <p className="text-[#657765] mt-2 text-sm md:text-base">
          From one little koala to a regional koala hospital
        </p>
      </div>

      <div className="relative w-full py-10">
        <div className="relative flex flex-col items-center">
          <div
            className="w-full items-center px-4 md:px-0"
          >
            <div className="relative flex flex-col w-full max-w-4xl mx-auto">

              {timelineEvents.map((event, index) => {
                const isTopOrLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className="w-full maxw-[180px] flex flex-col"
                  >

                    {/* 2. LINE + DOT */}
                      <div className="absolute left-[11px] top-0 bottom-0 w-1 bg-[#789578] z-0" />
                      <div className="relative w-6 h-6 mt-5 bg-[#547c52] border-4 border-[#f8faf6] rounded-full shadow-sm shrink-0 z-10" />

                    {/* 3. EVENT CARD */}
                    <div className="flex-1 pl-6 pb-8">
                      <div
                          className='w-full bg-white p-5 rounded-xl border border-[#dce6d9] shadow-md'
                      >
                        <span className="text-lg font-bold text-[#547c52] block mb-1">
                          {event.year}
                        </span>
                        <h3 className="font-bold text-[#344b37] mb-2 text-base leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-xs text-[#5e6b5e] leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}