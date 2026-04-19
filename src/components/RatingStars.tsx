interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const;

const textSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
} as const;

export default function RatingStars({ rating, size = 'md' }: RatingStarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars: Array<'full' | 'half' | 'empty'> = [];
  for (let i = 1; i <= 5; i++) {
    if (roundedRating >= i) {
      stars.push('full');
    } else if (roundedRating >= i - 0.5) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      <span className={`${sizeClasses[size]} flex`} aria-hidden="true">
        {stars.map((star, i) => {
          if (star === 'full') {
            return <span key={i} className="text-amber-400">★</span>;
          }
          if (star === 'half') {
            return (
              <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                <span className="text-gray-200">★</span>
                <span
                  style={{
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0.6em',
                    overflow: 'hidden',
                    color: '#F59E0B',
                  }}
                >
                  ★
                </span>
              </span>
            );
          }
          return <span key={i} className="text-gray-200">★</span>;
        })}
      </span>
      <span className={`${textSizeClasses[size]} text-gray-600`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
