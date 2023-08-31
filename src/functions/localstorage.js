export function addToLocalStorage(
  currentContent,
  contents,
  setIsAddedTo,
  type,
  storageKey
) {
  const contentObject = {
    id: currentContent.id,
    name:
      type === "movie" ? currentContent.original_title : currentContent.name,
    poster: currentContent.poster_path,
    type: type,
  };
  contents.push(contentObject);
  console.log(contents);
  localStorage.setItem(storageKey, JSON.stringify(contents));
  setIsAddedTo(true);
}

export function removeFromLocalStorage(id, contents, setIsAddedTo, storageKey) {
  const updatedContents = contents.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem(storageKey, JSON.stringify(updatedContents));
  setIsAddedTo(false);
}
