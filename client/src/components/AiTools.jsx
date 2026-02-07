import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AiToolsData.map((tool, idx) => (
          <div
            key={idx}
            className="group h-full rounded-2xl border border-slate-200/70 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            onClick={() => (user ? navigate(tool.path) : openSignIn())}
          >
            <tool.Icon
              className="size-12 p-3 text-white rounded-2xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold text-slate-800">
              {tool.title}
            </h3>
            <p className="text-slate-500 text-sm">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
