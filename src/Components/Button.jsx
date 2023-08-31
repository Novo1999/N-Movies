import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "../functions/localstorage";

function Button({
  id,
  contents,
  isAddedTo,
  setIsAddedTo,
  currentContent,
  contentType,
  storageKey,
  children,
}) {
  return (
    <div>
      {isAddedTo ? (
        <button
          onClick={() => {
            removeFromLocalStorage(id, contents, setIsAddedTo, storageKey);
          }}
          className="flex items-center gap-2 border-2 p-2 h-14 rounded-md hover:bg-white hover:text-black transition-all duration-500"
        >
          <span className="font-thin text-3xl">&#9745;</span>
          Added to {storageKey.charAt(0).toUpperCase() + storageKey.slice(1)}
        </button>
      ) : (
        <button
          onClick={() => {
            addToLocalStorage(
              currentContent,
              contents,
              setIsAddedTo,
              contentType,
              storageKey
            );
          }}
          className="flex items-center gap-2 border-2 p-2 h-14 rounded-md hover:bg-white hover:text-black transition-all duration-500"
        >
          <span className="font-thin text-3xl">+</span>
          {children}
        </button>
      )}
    </div>
  );
}

export default Button;
