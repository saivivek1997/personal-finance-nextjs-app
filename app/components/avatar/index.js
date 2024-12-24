import Image from "next/image";
import React from "react";

function Avatar({ img }) {
  return (
    <Image
      src={img}
      alt={img}
      width="40"
      height="40"
      className="rounded-full"
    />
  );
}

export default Avatar;
