import { useState } from "react";
import { Edit, Hash, Sparkles, Loader2 } from "lucide-react";
import { useBlogTitles } from "../hooks/useBlogTitles";
import Markdown from "react-markdown";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Travel",
    "Lifestyle",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const { generateBlogTitle, isLoading, content } = useBlogTitles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateBlogTitle({ keyword: input, category: selectedCategory });
    setSelectedCategory(blogCategories[0]);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="size-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input
          onChange={(e) => setInput(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            const paste = e.clipboardData.getData("text");
            setInput(paste);
          }}
          value={input}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          type="text"
          placeholder="Artificial Intelligence"
          required
        />
        <p className="mt-4 text-sm font-medium">Category</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              key={item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedCategory === item
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-500 border-gray-300"
              }`}
              onClick={() => setSelectedCategory(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <br />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Generating...
            </>
          ) : (
            <>
              <Hash className="size-4" />
              Generate Title
            </>
          )}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-87 max-h-[700px]">
        <div className="flex items-center gap-3">
          <Edit className="size-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">Generated Title</h1>
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
              <Edit className="size-9" />
              <p>Enter a keyword and click "Generate Title" to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
