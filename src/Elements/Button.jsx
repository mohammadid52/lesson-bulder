const Button = ({ classes = null, text, onClick, border = null }) => {
  const shadeMain = 400;
  const theme = "indigo";

  const borderColor = `border-${theme}-${shadeMain}`;
  const borderHoverColor = `border-${theme}-${shadeMain + 100}`;
  const _border =
    border || `${borderColor} focus:${borderColor} hover:${borderHoverColor}`;
  return (
    <>
      <button
        onClick={onClick}
        className={`${_border} font-semibold rounded  transition-all border-2 duration-300 px-4 text-white p-2 ${classes}`}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
