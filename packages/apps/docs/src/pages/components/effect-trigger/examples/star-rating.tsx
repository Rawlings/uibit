import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function StarRatingDemo() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <uibit-effect-trigger
            key={star}
            trigger="click"
            behavior="fountain-burst"
            density={6}
            velocity="800ms"
            randomize
          >
            <button
              onClick={() => setRating(star)}
              slot="trigger"
              className="text-gray-300 hover:text-black transition-colors focus:outline-none"
              aria-label={`Rate ${star} stars`}
            >
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill={star <= rating ? '#000000' : 'transparent'}
                stroke={star <= rating ? '#000000' : '#d1d5db'}
                strokeWidth="1.5"
                className="w-7 h-7"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>

            <div slot="asset">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="#6b7280" className="opacity-75">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </uibit-effect-trigger>
        ))}
    </div>
  );
}

const starRatingExample: UsageExample = {
  title: 'Star Rating Feedback',
  description:
    'Renders a review component where clicking a rating star launches a physics-based fountain cascade of micro SVG stars matching the selected theme color.',
  Demo: StarRatingDemo,
};

export default starRatingExample;
