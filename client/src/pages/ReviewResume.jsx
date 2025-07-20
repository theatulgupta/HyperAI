import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

const ReviewResume = () => {
  const [selectResume, setSelectResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <input
          type="file"
          onChange={(e) => setSelectResume(e.target.files[0])}
          value={selectResume}
          accept="application/pdf"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600 cursor-pointer"
          required
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF resume only
        </p>

        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <FileText className="size-4" />
          Analyse Resume
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-58 max-h-[600px]">
        <div className="flex items-center gap-3">
          <FileText className="size-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Analysis Result</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <FileText className="size-9" />
            <p>Upload a resume and click "Analyse Resume" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
