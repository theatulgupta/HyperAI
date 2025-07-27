import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Eraser, Sparkles, Loader2 } from "lucide-react";
import { useRemoveBackground } from "../hooks/useRemoveBackground";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [selectImage, setSelectImage] = useState(null);

  const { removeImageBackground, isLoading, image } = useRemoveBackground();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectImage(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectImage) {
      toast.error("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectImage);
    removeImageBackground(formData);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <div
          {...getRootProps()}
          className={`w-full mt-2 p-4 border-2 border-dashed rounded-md cursor-pointer text-center text-sm ${
            isDragActive ? "border-orange-500 bg-orange-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {selectImage ? (
            <p className="text-gray-600">{selectImage.name}</p>
          ) : (
            <p className="text-gray-500">
              Drag & drop your image here, or click to browse
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG and other image formats
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Removing...
            </>
          ) : (
            <>
              <Eraser className="size-4" />
              Remove Background
            </>
          )}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-62">
        <div className="flex items-center gap-3">
          <Eraser className="size-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {image ? (
          <div className="mt-3 h-full">
            <img src={image} alt="Processed" className="size-full" />
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="size-9" />
              <p>
                Upload an image and click "Remove Background" to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
