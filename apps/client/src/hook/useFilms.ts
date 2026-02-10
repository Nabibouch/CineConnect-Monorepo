import { useQuery } from '@tanstack/react-query';
import { apiFilm } from '../services/apiFilm';
import { useMemo } from 'react';

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
      (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    )[0];

    return { lastFilm };
  }, [films]);

  return { ...rest, data: homepageFilms };
};
