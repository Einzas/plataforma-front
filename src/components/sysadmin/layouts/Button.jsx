import PropTypes from "prop-types";

const Button = ({ sidebar, handleSidebar }) => {
  return (
    <>
      <button
        onClick={handleSidebar}
        className="grid lg:hidden fixed place-content-center bottom-4 right-4 p-2 bg-green-500 z-40 text-white rounded-full text-2xl"
      >
        {sidebar ? <i className="bx bx-x"></i> : <i className="bx bx-menu"></i>}
      </button>
    </>
  );
};

Button.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  handleSidebar: PropTypes.func.isRequired,
};

export default Button;
