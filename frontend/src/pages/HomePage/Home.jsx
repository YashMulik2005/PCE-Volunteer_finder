import React from "react";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-[#fafafa]">
      <div className=" w-full h-[8%]">
        <Navbar />
      </div>
      <div className=" w-full h-[92%]"></div>
    </div>
  );
}

export default Home;
