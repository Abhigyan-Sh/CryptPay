import { useState } from 'react';
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/logo.png";

const NavBarItem = ({ title }) => (
  <li className={`mx-4 cursor-pointer flex flex-col justify-center items-center text-lg hover:text-gray-50`}>
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex flex-row justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer"/>
      </div>
      <ul className="text-white hidden md:flex">
        {/* hidden for all devices but when w- > 760px make it appear using flex */}
        {
        ["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))
        }
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <RiMenu4Line fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {/* {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )} */}
        {toggleMenu && (
          <ul
          // z-[-10] 
            className="fixed -top-0 -right-[0] p-3 w-[60vw] h-screen drop-shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-xl blue-glassmorphism text-white animate-slide-in">
            <li className="text-2xl w-full my-2">
                <AiOutlineClose onClick={() => setToggleMenu(false)}/>
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
