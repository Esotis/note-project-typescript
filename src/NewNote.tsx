import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";

interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <section>
        <div className=" box">
          <div className=" mb-4">NewNote</div>
          <NoteForm
            onSubmit={onSubmit}
            onAddTag={onAddTag}
            availableTags={availableTags}
          />
        </div>
      </section>
    </>
  );
}
export default NewNote;
