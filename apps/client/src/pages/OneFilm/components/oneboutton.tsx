import { useState } from 'react';
import { Star } from 'lucide-react';

type RatingStarsProps = {
    averageRate: number;
    onRate: (value: number) => void;
    isPending?: boolean;
};

export const RatingStars = ({ averageRate, onRate, isPending }: RatingStarsProps) => {
    const [hoverRate, setHoverRate] = useState<number>(0);

    const displayedRate = hoverRate || averageRate;

    return (
        <div>
            <p className="text-white text-sm mb-2">Ta note</p>

            <div
                className="flex items-center gap-3"
                onMouseLeave={() => setHoverRate(0)}
            >
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => {
                        const starNumber = index + 1;
                        const fillPercent =
                            Math.min(Math.max(displayedRate - index, 0), 1) * 100;

                        return (
                            <button
                                key={starNumber}
                                type="button"
                                disabled={isPending}
                                onMouseMove={(event) => {
                                    const rect = event.currentTarget.getBoundingClientRect();
                                    const isHalf =
                                        event.clientX - rect.left < rect.width / 2;

                                    setHoverRate(isHalf ? index + 0.5 : starNumber);
                                }}
                                onFocus={() => setHoverRate(starNumber)}
                                onClick={(event) => {
                                    const rect = event.currentTarget.getBoundingClientRect();
                                    const isHalf =
                                        event.clientX - rect.left < rect.width / 2;

                                    const selectedRate = isHalf
                                        ? index + 0.5
                                        : starNumber;

                                    onRate(selectedRate);
                                }}
                                className="rounded-md p-0 transition-transform duration-150 hover:scale-110 disabled:cursor-not-allowed"
                                aria-label={`Noter ${starNumber} sur 5`}
                            >
                                <div className="relative h-8 w-8">
                                    <Star className="h-8 w-8 text-slate-500" />

                                    <div
                                        className="absolute left-0 top-0 h-8 overflow-hidden"
                                        style={{ width: `${fillPercent}%` }}
                                    >
                                        <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <span className="text-white text-lg min-w-20">
                    {isPending
                        ? 'Envoi...'
                        : `${displayedRate.toFixed(1)}/5`}
                </span>
            </div>
        </div>
    );
};