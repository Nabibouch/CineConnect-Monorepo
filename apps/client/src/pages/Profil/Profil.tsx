import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MessageSquareText, PencilLine, Star, UserPlus, Users } from "lucide-react";
import {
  useFollowActions,
  useFollowCounts,
  useFollowStatus,
  useMe,
  useUpdateUser,
  useUserById,
} from "../../hook/useUsers";
import { useSubjects } from "../../hook/useSubjects";
import { useFilms } from "../../hook/useFilms";
import { apiRatings } from "../../services/apiRating";
import { apiConversation } from "../../services/apiConversation";

const Profil = () => {
  const { id } = useParams({ from: "/_register/profil/$id" });
  const navigate = useNavigate();
  const { data: me, isLoading: isLoadingMe, error: meError } = useMe();
  const { data: userById, isLoading: isLoadingUser, error: userError } = useUserById(id);
  const { data: subjects = [] } = useSubjects();
  const { data: films = [] } = useFilms();
  const { data: ratings = [] } = useQuery({
    queryKey: ["ratings"],
    queryFn: apiRatings.getAllRatings,
    staleTime: 5 * 60 * 1000,
  });
  const safeRatings = Array.isArray(ratings) ? ratings : [];
  const { data: counts } = useFollowCounts(id);
  const { data: isFollowing } = useFollowStatus(id, me?.id);
  const { follow, unfollow } = useFollowActions(id);
  const updateUser = useUpdateUser(id);
  const [editOpen, setEditOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const isMine = Boolean(me && userById && me.id === userById.id);
  const myPosts = useMemo(
    () => subjects.filter((post) => Number(post.user_id) === Number(userById?.id)),
    [subjects, userById?.id],
  );

  const myRatings = useMemo(
    () => safeRatings.filter((rating) => Number(rating.user_id) === Number(userById?.id)),
    [safeRatings, userById?.id],
  );

  const ratedFilms = useMemo(() => {
    const filmMap = new Map(films.map((film) => [film.id, film]));
    return myRatings
      .map((rating) => ({
        rating,
        film: filmMap.get(rating.film_id),
      }))
      .filter((item) => Boolean(item.film));
  }, [films, myRatings]);

  const openEdit = () => {
    setUsername(me?.username ?? "");
    setBio(me?.bio ?? "");
    setAvatarUrl(me?.avatar_url ?? "");
    setEditOpen(true);
  };

  const createConversationMutation = useMutation({
    mutationFn: async () => {
      if (!me || !userById) throw new Error("Impossible de creer la conversation.");
      const json = (await apiConversation.createConversation([me.id, userById.id])) as { id?: number };
      if (!json.id) throw new Error("Conversation invalide");
      return json.id;
    },
    onSuccess: () => {
      navigate({ to: "/messages" });
    },
  });

  return (
    <main className="flex-1 bg-gradient-to-b from-slayer via-[#14052f] to-[#090112] px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {isLoadingMe || isLoadingUser ? (
            <p className="text-white/70">Chargement du profil...</p>
          ) : meError || userError || !userById ? (
            <p className="text-red-300">{meError?.message ?? userError?.message ?? "Profil introuvable"}</p>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={userById.avatar_url || "https://i.pravatar.cc/200?img=12"}
                    alt={`Avatar de ${userById.username}`}
                    className="h-24 w-24 rounded-full border-2 border-primary object-cover"
                  />
                  <div>
                    <h1 className="text-4xl font-semibold tracking-wide">{userById.username}</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/80">
                      {userById.bio || "Aucune bio pour le moment."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {isMine ? (
                    <button
                      onClick={openEdit}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                      type="button"
                    >
                      <PencilLine size={16} />
                      Modifier le profil
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (!me) return;
                          if (isFollowing) {
                            unfollow.mutate(me.id);
                          } else {
                            follow.mutate(me.id);
                          }
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                        type="button"
                      >
                        <UserPlus size={16} />
                        {isFollowing ? "Ne plus suivre" : "Suivre"}
                      </button>
                      <button
                        onClick={() => createConversationMutation.mutate()}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                        type="button"
                      >
                        <MessageSquareText size={16} />
                        Envoyer un message
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase text-white/60">Posts publies</p>
                  <p className="mt-1 text-2xl">{myPosts.length}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase text-white/60">Films notes</p>
                  <p className="mt-1 text-2xl">{myRatings.length}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="inline-flex items-center gap-2 text-xs uppercase text-white/60">
                    <Users size={14} /> Communaute
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    {counts?.followers ?? 0} followers - {counts?.following ?? 0} following
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
        {editOpen && (
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-xl">Edition du profil</h2>
            <form
              className="mt-4 grid gap-3 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                updateUser.mutate(
                  { username, bio, avatar_url: avatarUrl || null },
                  { onSuccess: () => setEditOpen(false) },
                );
              }}
            >
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="rounded-lg border border-white/15 bg-black/30 px-3 py-2"
              />
              <input
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="URL photo de profil"
                className="rounded-lg border border-white/15 bg-black/30 px-3 py-2"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
                className="md:col-span-2 min-h-[120px] rounded-lg border border-white/15 bg-black/30 px-3 py-2"
              />
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-white/20 px-4 py-2"
                  onClick={() => setEditOpen(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-white">
                  Enregistrer
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-3 text-xl">Films notes</h2>
            <div className="space-y-3">
              {ratedFilms.length === 0 ? (
                <p className="text-white/70">Aucun film note pour le moment.</p>
              ) : (
                ratedFilms.map(({ film, rating }) =>
                  film ? (
                    <Link
                      key={rating.id}
                      to="/films/$id"
                      params={{ id: String(film.id) }}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3 transition hover:border-primary/70"
                    >
                      <p>{film.title}</p>
                      <p className="inline-flex items-center gap-1 text-amber-300">
                        <Star size={14} /> {rating.rate}/10
                      </p>
                    </Link>
                  ) : null,
                )
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="mb-3 text-xl">Posts de l'utilisateur</h2>
            <div className="space-y-3">
              {myPosts.length === 0 ? (
                <p className="text-white/70">Aucun post publie.</p>
              ) : (
                myPosts.map((post) => (
                  <Link
                    key={post.id}
                    to="/subjects/$id"
                    params={{ id: String(post.id) }}
                    className="block rounded-lg border border-white/10 bg-black/20 p-3 transition hover:border-primary/70"
                  >
                    <p className="font-medium">{post.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-white/70">{post.description}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profil;