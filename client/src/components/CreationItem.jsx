import React, { useState } from "react";
import Markdown from "react-markdown";
const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-5 max-w-5xl w-full mx-auto text-sm bg-white/80 border border-slate-200/70 rounded-2xl shadow-sm backdrop-blur cursor-pointer transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="Creation Image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
