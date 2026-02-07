import { assets } from "../assets/assets";
import { testimonials } from "../data/testimonials";

const Testimonial = () => {
  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Loved by Creators
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="h-full rounded-2xl border border-slate-200/70 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <img
                    key={idx}
                    src={
                      idx < testimonial.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="size-4"
                    alt="star"
                  />
                ))}
            </div>
            <p className="text-slate-500 text-sm my-5">
              "{testimonial.content}"
            </p>
            <hr className="mb-5 border-gray-300" />
            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                className="w-12 object-contain rounded-full"
                alt=""
              />
              <div className="text-sm text-gray-600">
                <h3 className="font-medium">{testimonial.name}</h3>
                <p className="text-xs text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
