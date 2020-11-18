import React from "react";
import './Loader.css';

const Loader: React.FC<{ show: boolean }> = ({ show }) => {
  return show ? 
   <div className="lodaer-wrapper"><div className="loader" /> </div>
   : null;
};

export default Loader;