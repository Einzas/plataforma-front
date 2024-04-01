const Footer = () => {
  return (
    <footer className="grid text-white relative gap-10 justify-center py-10 bg-green-600/80">
      <nav>
        <ul className="sm:flex gap-10 items-center text-xl scroll-smooth ">
          <li>
            <a href="#">
              <i className="bx bx-book-content"> Legales</i>
            </a>
          </li>

          <li>
            <a href="#contact">
              <i className="bx bx-envelope"> Contactanos</i>
            </a>
          </li>
        </ul>
      </nav>

      <nav className="text-3xl">
        <ul className="flex justify-center gap-10">
          <li>
            <a
              href="https://www.linkedin.com/in/jeimy-jara-bautista-37383a240/"
              target="_blank"
            >
              <i className="bx bxl-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/Einzas/" target="_blank">
              <i className="bx bxl-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://github.com/Einzas/" target="_blank">
              <i className="bx bxl-instagram"></i>
            </a>
          </li>
        </ul>
      </nav>

      <hr className="absolute bottom-5 w-96 left-1/2 -translate-x-1/2" />
    </footer>
  );
};

export default Footer;
