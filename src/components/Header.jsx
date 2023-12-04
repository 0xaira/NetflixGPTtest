import logo from '../assets/logo.png';

const Header = () => {
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-[150px]">
      <img
        src={logo}
        alt=""
        className="absolute top-0 left-0 z-10 "
      />
    </div>
  );
};
export default Header;