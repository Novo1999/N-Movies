const dummyArr = Array.from({ length: 3 }, (_, i) => {
  return i;
});

function Favorites() {
  return (
    <section className="rounded-2xl col-span-1 bg-indigo-600 row-span-1 relative drop-shadow-xl shadow-xl">
      <div className="grid grid-cols-3 grid-rows-1 absolute mt-16 ">
        {/* {.map((i) => {
          return (
            <img
              className="p-2 w-32 h-48 rounded-xl mt-1"
              key={i}
              src="https://dummyimage.com/300"
              alt=""
            />
          );
        })} */}
      </div>
    </section>
  );
}

export default Favorites;
