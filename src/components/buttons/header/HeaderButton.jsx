function HeaderButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="font-poppins hover-lift cursor-pointer font-semibold tracking-wide text-muted uppercase transition-all duration-normal hover:scale-125 hover:text"
    >
      {text}
    </button>
  );
}

export default HeaderButton;
