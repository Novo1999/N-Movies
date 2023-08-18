function Search({ text }) {
  return (
    <section>
      <form className="text-white mx-auto flex justify-center flex-row items-center py-8">
        <label className="mr-4 mb-2" htmlFor="Search For Movies">
          Search For {text}
        </label>
        <input
          className="w-96 mb-2 h-8 rounded"
          type="text"
          id="search"
          name="search"
        />
        <input
          className="cursor-pointer ml-4 relative bg-blue-400 p-2 rounded-full hover:bg-black hover:translate-y-1 transition-all w-24"
          type="submit"
          value="Search"
        />
      </form>
    </section>
  );
}

export default Search;
