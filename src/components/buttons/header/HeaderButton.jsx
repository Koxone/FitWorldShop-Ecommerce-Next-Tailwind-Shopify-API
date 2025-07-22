function HeaderButton({ onClick, text }) {
  return (
    <button
      onClick={onClick}
      className="font-sans cursor-pointer font-semibold tracking-wide text-muted uppercase transition-all duration-normal hover:scale-105 hover:text-text hover:text-primary active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded-sm px-2 py-1"
    >
      {text}
    </button>
  );
}

export default HeaderButton;
