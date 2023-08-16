function Search() {
  return (
    <section>
      <form className="text-white mx-auto flex items-center flex-col py-8">
        <label className=" mb-2" htmlFor="Search For Movies">
          Search For Movies...
        </label>
        <input
          className="w-96 mb-2 h-8 rounded"
          type="text"
          id="search"
          name="search"
        />
        <input
          className="cursor-pointer bg-blue-400 p-2 rounded-full hover:bg-black hover:translate-y-1 transition-all w-24"
          type="submit"
          value="Search"
        />
      </form>
    </section>
  );
}

export default Search;
