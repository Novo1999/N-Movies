export function stored(storedcontents, setIsAdded, id) {
  const contents = !storedcontents ? [] : JSON.parse(storedcontents);

  if (contents.some((item) => item.id === id)) {
    setIsAdded(true);
  } else {
    setIsAdded(false);
  }
}
