import React from "react";

const Header = ({ images, name, description, type }) => {
  return (
    <header className="has-background-primary-dark p-5 has-text-white">
      <p className="is-size-5">{type}</p>
      <div className="is-flex">
        <img
          src={images[0].url}
          alt=""
          style={{ width: "256px", height: "256px" }}
        />
        <div className="p-4 is-flex is-flex-direction-column is-justify-content-space-around">
          <p className="is-size-1">{name}</p>
          <p>{description}</p>
        </div>
      </div>
    </header>
  );
};
export default Header;
