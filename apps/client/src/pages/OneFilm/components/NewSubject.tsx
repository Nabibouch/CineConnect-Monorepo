import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useCreateSubject } from '../../../hook/useSubjects';

export const NewSubject = () => {
  const { id } = useParams({ from: '/_register/films/$id' });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createSubject = useCreateSubject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !id) return;

    createSubject.mutate(
      {
        title: title,
        description: description.trim(),
        film_id: Number(id),
        user_id: 1, // Hardcoded en attendant un auth context si ce n'est pas fourni
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
        },
      }
    );
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-8 mb-8 border border-gray-700 w-full mx-auto">
      <h3 className="text-xl font-semibold text-white mb-4">Démarrer un nouveau sujet de discussion</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="subject-title" className="block text-sm font-medium text-gray-300 mb-1">
            Titre du sujet
          </label>
          <input
            id="subject-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="De quoi voulez-vous discuter ?"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            disabled={createSubject.isPending}
            required
          />
        </div>

        <div>
          <label
            htmlFor="subject-description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="subject-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoutez quelques détails (facultatif)"
            rows={4}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none"
            disabled={createSubject.isPending}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-sm">
            {createSubject.isError && (
              <span className="text-red-400">Erreur lors de la création du sujet. Veuillez réessayer.</span>
            )}
            {createSubject.isSuccess && (
              <span className="text-green-400">Sujet créé avec succès !</span>
            )}
          </div>
          <button
            type="submit"
            disabled={createSubject.isPending || !title.trim()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 text-white font-medium rounded-md transition-colors"
          >
            {createSubject.isPending ? 'Création en cours...' : 'Créer le sujet'}
          </button>
        </div>
      </form>
    </div>
  );
};
