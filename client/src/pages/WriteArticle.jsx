import { useState } from "react";
import { Edit, Sparkles, Loader2 } from "lucide-react";
import { useWriteArticle } from "../hooks/useWriteArticle";
import Markdown from "react-markdown";

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  const {
    generateArticle,
    isLoading,
    isError,
    error,
    content,
    setGeneratedArticle,
  } = useWriteArticle();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedArticle(null);
    generateArticle({ prompt: input, length: selectedLength.length });
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
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          type="text"
          placeholder="The future of artificial intelligence is..."
          required
        />
        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              key={index}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.text === item.text
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              onClick={() => setSelectedLength(item)}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Generating...
            </>
          ) : (
            <>
              <Edit className="size-4" />
              Generate Article
            </>
          )}
        </button>

        {isError && (
          <p className="text-red-500 mt-2 text-sm">{error.message}</p>
        )}
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-87 max-h-[700px]">
        <div className="flex items-center gap-3">
          <Edit className="size-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>
        <div className="flex-1 p-4 overflow-auto flex flex-col justify-center items-center">
          {content ? (
            <p className="pt-15 text-sm whitespace-pre-line">
              <Markdown>{content}</Markdown>
            </p>
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="size-9" />
              <p>Enter a topic and click "Generate Article" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
