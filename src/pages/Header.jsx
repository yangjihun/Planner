import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ name, setName }) => {
  const clk = () => {
    setName('')
  }
  return (
    <header className="bg-white text-gray-600 body-font shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center w-full"> {/* w-full 추가 */}
        <Link to="/" className="flex title-font font-medium items-center text-headerTextColor mb-4 md:mb-0">
          <span className="ml-3 text-3xl font-bold">KYPL</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center w-full md:w-auto">
          <Link to="/" className="mr-10 hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150">Home</Link>
          <Link to="/auction" className="mr-10 hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150">Auction</Link>
          <Link to="/login" className="mr-10 hover:text-headerTextColor font-semibold hover:scale-105 transition duration-150">{name==='' ? 'Login' : <div onClick={()=>clk()}>Logout</div>}</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;