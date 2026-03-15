import type { Comment } from "../../../utils/types";

interface SubjectCardProps {
  subject: Comment;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  // Use `title` if provided from backend or `content` from the type definition
  const displayContent = subject.content || (subject as any).title;

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Subject #{subject.id}</h2>
        <span className="text-xs bg-muted px-2 py-1 rounded-full">
          User {subject.user_id}
        </span>
      </div>
      
      <p className="text-sm text-muted-foreground overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
        {displayContent}
      </p>

      <div className="mt-auto pt-4 flex gap-4 text-sm border-t border-border">
        {subject.film_id && (
          <p>
            <span className="font-medium">Film ID :</span> {subject.film_id}
          </p>
        )}
        {subject.post_id && (
          <p>
            <span className="font-medium">Post ID :</span> {subject.post_id}
          </p>
        )}
      </div>
    </article>
  );
};

export default SubjectCard;
