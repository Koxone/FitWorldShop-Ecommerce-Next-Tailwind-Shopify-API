import React from 'react';

function GenderFilterButton({ text }) {
  return (
    <button
      //   onClick={() => setCategoryFilter(null)}
      className={`font-poppins w-fit cursor-pointer rounded-md border px-2 py-2 font-medium text-gray-300 uppercase transition-all duration-200 hover:bg-gray-700 hover:text-white md:px-6`}
    >
      {text}
    </button>
  );
}

export default GenderFilterButton;
// ${
//         categoryFilter === null
//           ? 'bg-white text-gray-900'
//           : 'border text-gray-300 hover:bg-gray-700 hover:text-white'
//       }
