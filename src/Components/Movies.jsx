import { useEffect } from "react";
import Paginate from "./Paginate";

const dummyArr = Array.from({ length: 10 }, (_, i) => {
  return i;
});

function Movies() {
  return (
    <section className="border-2 col-span-3 row-span-2 relative">
      <h1 className="text-white font-bold text-xl text-center">Movies</h1>
      <div className="grid grid-cols-5 p-10 ml-5">
        {dummyArr.map((i) => {
          return (
            <img
              className="w-48 h-64 mb-12 rounded"
              key={i}
              src="https://dummyimage.com/300"
              alt=""
            />
          );
        })}
      </div>
      <Paginate />
    </section>
  );
}

export default Movies;
