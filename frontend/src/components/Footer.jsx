import React from "react";
import { GiShakingHands } from "react-icons/gi";

function Footer() {
  return (
    <div className="bg-[radial-gradient(circle_at_center,#04687f,_#035466,_#02404e)] text-white flex flex-col justify-center items-center p-5">
      <section className=" font-semibold text-white flex gap-1 items-center">
        <GiShakingHands size={25} />
        <p className=" text-lg">FindMyVolunteer</p>
      </section>
      <p className=" text-sm">Copyright@2025 All rights are reserved</p>
    </div>
  );
}

export default Footer;
