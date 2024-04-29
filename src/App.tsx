import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EditNote from "./EditNote";
import NewNote from "./NewNote";
import Note from "./Note";
import NoteLayout from "./NoteLayout";
import NoteList from "./NoteList";
import { useLocalStrorage } from "./useLocalStorage";

export interface Note {
  id: string;
}

export interface RawNote extends RawNoteData {
  id: string;
}

export interface RawNoteData {
  title: string;
  body: string;
  tagIds: string[];
}

export interface NoteData extends Note {
  title: string;
  body: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  label: string;
}

function App() {
  const [notes, setNotes] = useLocalStrorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStrorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [...prevNotes, { ...data, tagIds: tags.map((tag) => tag.id) }];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) =>
      prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      })
    );
  }

  function deleteTag(id: string) {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <NoteList
            availableTags={tags}
            notes={notesWithTags}
            updateTag={updateTag}
            deleteTag={deleteTag}
          />
        }
      />
      <Route
        path="/new"
        element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />
        }
      />
      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDeleteNote={onDeleteNote} />} />
        <Route
          path="edit"
          element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
