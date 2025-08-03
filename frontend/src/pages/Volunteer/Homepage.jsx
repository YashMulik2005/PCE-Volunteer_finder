import React, { useEffect, useState } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

function Homepage() {
  const [data, setdata] = useState([]);

  const getdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}events`);
    const result = res.data;
    console.log(result?.data);

    setdata(result?.data);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <div>
      <div className="bg-[#f6f6f6] w-full min-h-screen flex flex-col overflow-y-auto">
        <div className="h-12 shadow-md">
          <VolunteerNavbar />
        </div>
        <div className="flex-grow overflow-y-auto px-4 sm:px-24 bg-[#f6f6f6] p-4">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            className="rounded-xl overflow-hidden mb-6"
          >
            {[img1, img2, img3].map((img, i) => (
              <div key={i} className="h-52 w-full">
                <img
                  src={img}
                  alt={`Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                {/* <p className="legend text-sm sm:text-base">Legend {i + 1}</p> */}
              </div>
            ))}
          </Carousel>

          <div className="flex gap-4">
            <input
              className="  px-3 py-2.5 text-sm rounded w-full focus:outline-none"
              placeholder="Search..."
            />
            <button className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl">
              Search
            </button>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4  mt-4">
            {data?.map((item, index) => {
              return <EventCard key={index} data={item} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
