import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "./App";

interface NoteFormProps extends Partial<NoteData> {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  body = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(event: FormDataEvent) {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: textareaRef.current!.value,
      tags: selectedTags,
      id: uuidV4(),
    });
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* title and tags */}
        <div className="flex flex-wrap gap-4">
          <div className="w-1/3 flex-1">
            <label htmlFor="title" className="mb-2 block font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              className=" w-full rounded-md border-2 border-slate-300 px-4 py-[5px] "
              ref={titleRef}
              defaultValue={title}
              required
            />
          </div>
          <div className="w-1/3 flex-1">
            <label htmlFor="tags" className="mb-2 block font-medium">
              Tags
            </label>
            <CreatableReactSelect
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
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
              options={availableTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
            />
          </div>
          {/* body */}
          <div className="w-full">
            <label htmlFor="textarea" className="mb-2 block font-medium">
              Body
            </label>
            <textarea
              id="textarea"
              className=" h-96 w-full resize-none overflow-y-auto rounded-md border-2 border-slate-300 px-4 py-[5px]"
              ref={textareaRef}
              required
              defaultValue={body}
            ></textarea>
          </div>
          {/* save and cancel buttons */}
          <div className=" ml-auto">
            <button
              type="submit"
              className=" mr-2 rounded-lg bg-blue-700 px-5 py-3 text-xl font-medium text-white transition duration-200 hover:opacity-90"
            >
              Save
            </button>
            <Link to="/">
              <button className="rounded-lg border-2 border-slate-300 px-3 py-3 text-xl font-medium text-slate-400 transition duration-200 hover:border-slate-500 hover:bg-slate-500 hover:text-slate-200">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default NoteForm;
