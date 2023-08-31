import LocalStorage from "./LocalStorage";

function Watchlist() {
  return (
    <LocalStorage
      type="Watchlist"
      storageKey="watchlist"
      bgColor="bg-indigo-600"
    />
  );
}

export default Watchlist;

/* 
- Watchlist state will be localstorage
- Click add 
- Movie id added to array
- if added and clicked again, remove from array
- Render and update using the array accordingly
*/
