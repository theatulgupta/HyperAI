import { useState, useCallback } from "react";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { useReviewResume } from "../hooks/useReviewResume";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [selectResume, setSelectResume] = useState(null);
  const { reviewResume, isLoading, content } = useReviewResume();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setSelectResume(acceptedFiles[0]);
    },
    [setSelectResume]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectResume) {
      toast.error("Please upload a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectResume);
    reviewResume(formData);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>
        <div
          {...getRootProps()}
          className={`w-full mt-2 p-4 border-2 border-dashed rounded-md cursor-pointer text-center text-sm ${
            isDragActive ? "border-[#00DA83] bg-[#f0fdf9]" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {selectResume ? (
            <p className="text-gray-600">{selectResume.name}</p>
          ) : (
            <p className="text-gray-500">
              Drag & drop your Resume here, or click to browse
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF resume only
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Analyzing...
            </>
          ) : (
            <>
              <FileText className="size-4" />
              Analyze Resume
            </>
          )}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-62 max-h-[700px] overflow-y-auto">
        <div className="flex items-center gap-3">
          <FileText className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Analysis Result</h1>
        </div>

        {content ? (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="size-9" />
              <p>Upload a resume and click "Analyse Resume" to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewResume;
