import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

interface NoteProps {
  onDeleteNote: (id: string) => void;
}

function Note({ onDeleteNote }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <>
      <section>
        <div className="box">
          {/* Title and buttons note */}
          <div className="mb-6 flex">
            <div className="w-1/2">
              <h1 className="mb-4 w-full text-4xl font-bold ">{note.title}</h1>
              <div className=" flex flex-wrap gap-1">
                {note.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="truncate rounded-lg bg-blue-700 px-2 py-1 font-bold text-white"
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex w-1/2 items-center justify-center gap-3">
              <Link to={`/${note.id}/edit`}>
                <button className="rounded-lg border-2 border-blue-700 bg-blue-700 px-5 py-3 text-xl font-medium text-white transition duration-200 hover:opacity-90">
                  Edit
                </button>
              </Link>

              <button
                type="submit"
                className="rounded-lg border-2 border-red-500  px-5 py-3 text-xl font-medium text-red-500 transition duration-200 hover:bg-red-500 hover:text-white"
                onClick={() => {
                  onDeleteNote(note.id);
                  navigate("/");
                }}
              >
                Delete
              </button>

              <Link to="/">
                <button className="rounded-lg border-2 border-slate-300 px-3 py-3 text-xl font-medium text-slate-400 transition duration-200 hover:border-slate-500 hover:bg-slate-500 hover:text-slate-200">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <ReactMarkdown>{note.body}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}

export default Note;
