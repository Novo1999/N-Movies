import "./Spinner.css";

export function Spinner({ bottomposition }) {
  return (
    <div className={`lds-ring ${bottomposition} `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
