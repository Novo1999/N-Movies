import LocalStorage from "./LocalStorage";

function Favorites() {
  return (
    <LocalStorage
      type="Favorites"
      storageKey="favorites"
      bgColor="bg-yellow-500"
    />
  );
}

export default Favorites;
