type UserLike = {
  id: number;
  username?: string;
  email?: string;
};

type UserInfoCardProps = {
  title: string;
  user?: UserLike | null;
  loading?: boolean;
  error?: string | null;
};

const UserInfoCard = ({
  title,
  user,
  loading,
  error,
}: UserInfoCardProps) => {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-white">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>

      {loading ? (
        <p className="text-sm text-slate-300">Chargement...</p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : !user ? (
        <p className="text-sm text-slate-400">Aucun utilisateur.</p>
      ) : (
        <div className="space-y-1 text-sm text-slate-200">
          <p>
            <span className="font-medium text-white">id:</span> {user.id}
          </p>
          {user.username && (
            <p>
              <span className="font-medium text-white">username:</span> {user.username}
            </p>
          )}
          {user.email && (
            <p>
              <span className="font-medium text-white">email:</span> {user.email}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;

