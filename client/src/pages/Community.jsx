import { useUser } from "@clerk/clerk-react";
import { Heart, Loader2, RotateCw } from "lucide-react";
import { useCommunity } from "../hooks/useCommunity";

const Community = () => {
  const { user } = useUser();
  const { creations, isLoading, toggleLike, refetchCreations } = useCommunity();

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Creations</h1>
        <button
          onClick={refetchCreations}
          title="Refresh"
          className="text-green-600 hover:text-green-800 transition-colors bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
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
      <div className="bg-white size-full rounded-xl overflow-y-scroll">
        {isLoading ? (
          <div className="size-full flex items-center justify-center text-gray-500">
            <Loader2 className="animate-spin size-4 mr-1" />
            Loading Creations...
          </div>
        ) : (
          (creations || []).map((creation, index) => (
            <div
              key={index}
              className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
            >
              <img
                src={creation.content}
                alt="creation"
                className="size-full object-cover rounded-lg"
              />

              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                <p className="text-sm hidden group-hover:block">
                  {creation.prompt}
                </p>
                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => toggleLike({ id: creation.id })}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
