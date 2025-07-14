function HeaderButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="font-poppins hover-lift cursor-pointer font-semibold tracking-wide text-gray-300 uppercase transition-all duration-300 hover:scale-125 hover:text-white"
    >
      {text}
    </button>
  );
}

export default HeaderButton;
