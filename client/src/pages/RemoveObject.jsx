import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Scissors, Sparkles, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRemoveObject } from "../hooks/useRemoveObject";

const RemoveObject = () => {
  const [object, setObject] = useState("");
  const [file, setFile] = useState(null);
  const { removeImageObject, isLoading, image } = useRemoveObject();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload an image first.");
      return;
    }

    if (!object.trim()) {
      toast.error("Please enter the object to remove.");
      return;
    }

    if (object.trim().split(" ").length > 1) {
      toast.error("Please enter only one object to remove.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("object", object.trim());
    removeImageObject(formData);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <div
          {...getRootProps()}
          className={`w-full mt-2 p-4 border-2 border-dashed rounded-md cursor-pointer text-center text-sm ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <p className="text-gray-600">{file.name}</p>
          ) : (
            <p className="text-gray-500">
              Drag & drop your image here, or click to browse
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG and other image formats
        </p>

        <p className="mt-6 text-sm font-medium">Describe object to remove</p>
        <input
          type="text"
          onChange={(e) => setObject(e.target.value)}
          value={object}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g. watch or spoon, etc."
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Be specific about what you want to remove.
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Removing...
            </>
          ) : (
            <>
              <Scissors className="size-4" />
              Remove Background
            </>
          )}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-84">
        <div className="flex items-center gap-3">
          <Scissors className="size-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {image ? (
            <img
              src={image}
              alt="Processed"
              className="max-h-full max-w-full rounded-md"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="size-9" />
              <p>Upload an image and click "Remove Object" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
