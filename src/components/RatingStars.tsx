interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
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

export default function RatingStars({ rating, reviewCount, size = 'md' }: RatingStarsProps) {
  const roundedRating = Math.round(rating * 2) / 2;

  const stars: string[] = [];
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
    <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${rating} out of 5 stars${reviewCount ? `, ${reviewCount} reviews` : ''}`}>
      <span className={`${sizeClasses[size]} flex`} aria-hidden="true">
        {stars.map((star, i) => (
          <span key={i} className="text-yellow-500">
            {star === 'full' ? '★' : star === 'half' ? '★' : '☆'}
          </span>
        ))}
        {/* Half star overlay */}
        <span className="sr-only">{rating} out of 5</span>
      </span>
      <span className={`${textSizeClasses[size]} text-gray-600`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className={`${textSizeClasses[size]} text-gray-400`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
