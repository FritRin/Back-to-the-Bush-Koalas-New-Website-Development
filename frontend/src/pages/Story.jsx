import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStoryById } from "../api/Story";
import { sanitizeHTML } from "../utils/sanitizeHTML";

function Story() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null); // URL of image currently expanded

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStoryById(id);
        setStory(data);
      } catch (error) {
        console.error("Failed to load story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return <p className="text-center py-12">Loading story...</p>;
  }

  if (!story) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-semibold mb-4">Story not found.</p>
        <Link to="/" className="text-[#6b7537] underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const images = Array.isArray(story.image_urls) ? story.image_urls : [];
  const mainImage = images[0] ? `http://localhost:3000${images[0]}` : null;

  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-block text-sm font-semibold text-[#6b7537] hover:underline mb-4"
      >
        ← Back to Stories
      </Link>

      {/* Story Title */}
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
        {story.title}
      </h1>

      {/* 1. Main Photo (Index 0) - Clickable to expand */}
      {mainImage && (
        <div
          onClick={() => setExpandedImage(mainImage)}
          className="w-full h-full md:h-[1000px] rounded-xl overflow-hidden shadow-md cursor-zoom-in mb-4 bg-gray-100"
        >
          <img
            src={mainImage}
            alt={story.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* 2. Horizontal Thumbnail Carousel (Shown when there are multiple images) */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-3 mb-8">
          {images.map((imgPath, index) => {
            const fullUrl = `http://localhost:3000${imgPath}`;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setExpandedImage(fullUrl)}
                className="flex-shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#6b7537] focus:outline-none cursor-zoom-in transition-all"
              >
                <img
                  src={fullUrl}
                  alt={`${story.title} gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Rich Text Description / Content */}
      <div
        className="story-preview-content"
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(story.content) }}
      />

      {/* 4. Expanded Lightbox Modal */}
      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-end"
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="mb-2 px-3 py-1 bg-white/90 text-gray-900 text-sm font-semibold rounded-md hover:bg-white"
            >
              Close ✕
            </button>
            <img
              src={expandedImage}
              alt="Expanded view"
              className="max-h-[82vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </article>
  );
}

export default Story;