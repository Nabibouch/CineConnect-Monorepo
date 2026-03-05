import { useQuery } from '@tanstack/react-query';
import { apiFilm, type Film } from '../services/apiFilm';
import { useMemo } from 'react';

export const useFilms = () => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => apiFilm.getAllFilms(),
    staleTime: 10 * 60 * 1000,
  });
};

const getAverageRating = (film: Film): number => {
  if (!film.ratings.length) return 0;
  return film.ratings.reduce((sum, r) => sum + r.rate, 0) / film.ratings.length;
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
      .slice(0, 3);

    return { lastFilm, topRated };
  }, [films]);

  return { ...rest, data: homepageFilms };
};