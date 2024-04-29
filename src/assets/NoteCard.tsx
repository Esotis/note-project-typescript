import { Link } from "react-router-dom";
import { Tag } from "../App";

export interface NoteCardProps {
  id: string;
  title: string;
  tags: Tag[];
}

function NoteCard({ id, title, tags }: NoteCardProps) {
  return (
    <Link to={`/${id}`}>
      <div className="flex h-48 w-full flex-wrap items-center justify-center rounded-md border-2 border-slate-300 transition-all duration-150 hover:-translate-y-[5px] hover:shadow-lg">
        <div className="flex flex-wrap justify-center">
          <h1 className="mb-4 w-full text-center text-3xl font-medium">
            {title}
          </h1>
          {/* tags container */}
          <div className=" flex w-1/2 flex-wrap items-center justify-center gap-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="truncate rounded-lg bg-blue-700 px-2 py-1 font-bold text-white"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
