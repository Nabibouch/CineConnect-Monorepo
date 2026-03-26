import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useMe, useUserById } from "../../hook/useUsers";
import UserInfoCard from "./components/UserInfoCard";

const Profil = () => {
  const { id } = useParams({ from: "/_register/profil/$id" });
  const [targetUserId, setTargetUserId] = useState(id);

  useEffect(() => {
    setTargetUserId(id);
  }, [id]);

  const { data: me, isLoading: isLoadingMe, error: meError } = useMe();
//   const {
//     data: userById,
//     isLoading: isLoadingUser,
//     error: userError,
//   } = useUserById(targetUserId);

  return (
    <main className="flex-1 bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-3xl font-semibold tracking-wide">Profil</h1>

        <section className="grid gap-6 md:grid-cols-2">
          <UserInfoCard
            title="Moi (me)"
            user={me}
            loading={isLoadingMe}
            error={meError ? meError.message : null}
          />

          {/* <UserInfoCard
            title={`Utilisateur (id=${targetUserId})`}
            user={userById}
            loading={isLoadingUser}
            error={userError ? userError.message : null}
          /> */}
        </section>

        {/* <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              id utilisateur
              <input
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="w-40 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-white"
              />
            </label>
          </div>

          <p className="mt-3 text-sm text-slate-300">
            Note: le fetch de <span className="font-medium text-white">/users/me</span> dépend de ta
            session (cookie JWT).
          </p>
        </section> */}
      </div>
    </main>
  );
};

export default Profil;