export function addToWatchList(content, contents, setIsAddedToWatchList, type) {
  const contentObject = {
    id: content.id,
    name: type === "movie" ? content.original_title : content.name,
    poster: content.poster_path,
    type: type,
  };
  contents.push(contentObject);
  localStorage.setItem("contents", JSON.stringify(contents));
  setIsAddedToWatchList(true);
}

export function removeFromWatchList(id, contents, setIsAddedToWatchList) {
  const updatedContents = contents.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem("contents", JSON.stringify(updatedContents));
  setIsAddedToWatchList(false);
}
