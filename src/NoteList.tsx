import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import NoteCard, { NoteCardProps } from "./assets/NoteCard";
import EditTagsModal from "./EditTagsModal";

interface NoteListProps {
  availableTags: Tag[];
  notes: NoteCardProps[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

function NoteList({
  availableTags,
  notes,
  updateTag,
  deleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <section>
        <div className="box">
          <div className=" mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold ">Notes</h1>
            {/* Create and Edit buttons */}
            <div>
              <Link to="/new">
                <button className=" mr-2 rounded-lg bg-blue-700 px-5 py-3 text-xl font-medium text-white transition duration-200 hover:opacity-90">
                  Create
                </button>
              </Link>

              <button
                className="rounded-lg border-2 border-slate-300 px-3 py-3 text-xl font-medium text-slate-400 transition duration-200 hover:border-slate-500 hover:bg-slate-500 hover:text-slate-200"
                onClick={() => setShowModal(true)}
              >
                Edit Tags
              </button>
            </div>
          </div>

          {/* Title and Tags */}
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="w-1/3 flex-1">
              <label htmlFor="title" className="mb-2 block font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                className=" w-full rounded-md border-2 border-slate-300 px-4 py-[5px] "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-1/3 flex-1">
              <label htmlFor="tags" className="mb-2 block font-medium">
                Tags
              </label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
              />
            </div>
          </div>
          {/* Note Cards */}
          <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                tags={note.tags}
              />
            ))}
          </div>
        </div>
      </section>
      <EditTagsModal
        availableTags={availableTags}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  );
}

export default NoteList;
