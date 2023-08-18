import "./Spinner.css";

export function Spinner({ bottomPosition }) {
  return (
    <div className={`lds-ring ${bottomPosition} `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
