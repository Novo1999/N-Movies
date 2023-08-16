const dummyArr = Array.from({ length: 7 }, (_, i) => {
  return i;
});

function Series() {
  return (
    <section className="border-2 col-span-2 row-span-1">
      <div className="grid grid-cols-4 h-48">
        {dummyArr.map((i) => {
          return (
            <img
              className="w-36 h-44 rounded m-auto mt-5 mb-6"
              key={i}
              src="https://dummyimage.com/300"
              alt=""
            />
          );
        })}
      </div>
    </section>
  );
}

export default Series;
