import { useQuery } from '@tanstack/react-query';
import { apiFilm } from '../services/apiFilm';
import { useMemo } from 'react';
import { getAverageRating } from '../utils/averageRating';

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => apiFilm.getAllFilms(),
    staleTime: 10 * 60 * 1000,
  });
};


export const useFilmsHomepage = () => {
  const { data: films, ...rest } = useFilms();

  const homepageFilms = useMemo(() => {
    if (!films) return null;

    const lastFilm = [...films].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];

    const topRated = [...films]
      .sort((a, b) => getAverageRating(b) - getAverageRating(a))
      .slice(0, 8);

    return { lastFilm, topRated };
  }, [films]);

  return { ...rest, data: homepageFilms };
};