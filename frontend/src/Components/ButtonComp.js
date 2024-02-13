import React from "react";

const ButtonComp = ({handler, text}) => {
  return (
    <button
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-5 my-11 rounded"
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default ButtonComp;
