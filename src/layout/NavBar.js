import React from "react";


const Navbar = () => {
  let imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <nav>
        <img src={imgUrl} alt="pokeapi-logo" className="header"/>
    </nav>
  );
};

export default Navbar;
