import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Tag } from "./App";

interface EditTagsModalProps {
  availableTags: Tag[];
  showModal: boolean;
  handleClose: () => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
}

function EditTagsModal({
  availableTags,
  showModal,
  handleClose,
  updateTag,
  deleteTag,
}: EditTagsModalProps) {
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (!showModal) return;
    setAnimation(true);
  }, [showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 z-10 h-screen w-full bg-zinc-400/40">
          <div
            className={`absolute top-0 right-[10%] left-[10%] opacity-0 transition-all duration-300 ${
              animation && "top-20 opacity-100"
            }`}
          >
            <div className=" w-full rounded-lg bg-white p-4">
              <div className="flex items-center justify-between border-b-2 border-slate-300 pb-5">
                <h2 className="text-2xl font-bold ">Edit Tags</h2>
                <FaTimes
                  onClick={() => {
                    setAnimation(false);
                    handleClose();
                  }}
                  className="text-2xl"
                />
              </div>
              <div className="flex w-full flex-wrap gap-2 border-b-2 border-slate-300 py-5">
                {availableTags.map((tag) => {
                  return (
                    <div className="flex w-full gap-3" key={tag.label}>
                      <input
                        type="text"
                        defaultValue={tag.label}
                        className="w-full rounded-md border-2 border-slate-300 px-3 py-1"
                        onChange={(e) => updateTag(tag.id, e.target.value)}
                        autoFocus
                      />
                      <div
                        className="rounded-md border-2 border-red-600 p-4 transition duration-150 hover:bg-red-600 hover:text-white"
                        onClick={() => deleteTag(tag.id)}
                      >
                        <FaTimes className=" text-base" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-4 rounded-lg bg-blue-700 px-5 py-3 text-base font-medium text-white transition duration-200 hover:opacity-90"
                  onClick={() => {
                    setAnimation(false);
                    handleClose();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTagsModal;
