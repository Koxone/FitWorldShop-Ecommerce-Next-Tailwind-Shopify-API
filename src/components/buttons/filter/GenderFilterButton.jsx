'use client';

function GenderFilterButton({ text, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`font-poppins w-fit cursor-pointer rounded-md border px-2 py-2 font-medium uppercase transition-all duration-200 md:px-6 ${
        isActive
          ? 'bg-gray-700 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {text}
    </button>
  );
}

export default GenderFilterButton;
