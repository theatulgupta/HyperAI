import { useEffect } from "react";
import { GemIcon, Sparkles, Loader2, RotateCw } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";
import { useDashboard } from "../hooks/useDashboard.js";

const Dashboard = () => {
  const { creations, isLoading, refetchCreations } = useDashboard();

  useEffect(() => {
    refetchCreations();
    console.log(creations);
  }, [refetchCreations, creations]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="size-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="size-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="size-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <GemIcon className="size-5 text-white" />
          </div>
        </div>
      </div>
      {/* Recent Creations Card */}
      <div className="space-y-3">
        <div className="flex flex-row justify-between items-center">
          <p className="mt-6 mb-4">Recent Creations</p>
          <button
            onClick={refetchCreations}
            title="Refresh"
            className="text-purple-600 hover:text-purple-800 transition-colors bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
          >
            {isLoading ? (
              <div>
                <Loader2 className="animate-spin size-4" />
              </div>
            ) : (
              <RotateCw className="size-4" />
            )}
          </button>
        </div>
        {isLoading ? (
          <div className="size-full flex items-center justify-center text-gray-500">
            <Loader2 className="animate-spin size-4 mr-1" />
            Loading Creations...
          </div>
        ) : creations.length === 0 ? (
          <div className="size-full flex items-center justify-center text-gray-500">
            No creations found.
          </div>
        ) : (
          creations.map((item) => <CreationItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Dashboard;
