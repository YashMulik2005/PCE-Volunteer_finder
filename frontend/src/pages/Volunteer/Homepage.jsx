import React, { useEffect, useState } from "react";
import VolunteerNavbar from "../../components/VolunteerNavbar";
import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { MdEventNote } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router";

function Homepage() {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const getdata = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}events`);
    const result = res.data;
    console.log(result?.data);

    setdata(result?.data);
  };

  const handleSearch = async () => {
    if (!title && !location) {
      getdata();
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}events/search`,
        {
          params: { title, location },
        }
      );
      if (res.data.status) {
        setdata(res.data.data);
      }
    } catch (err) {
      console.error("Error searching events:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!title && !location) {
      getdata();
    }
  }, [title, location]);

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="bg-[#f6f6f6] w-full min-h-screen h-screen flex flex-col">
      <div className="h-[7%] shadow-md ">
        <VolunteerNavbar />
      </div>

      <div className="flex w-full flex-grow h-[93%] overflow-hidden">
        <div className="w-[15%] bg-white h-full flex-shrink-0">
          <ul className="flex flex-col">
            <li
              onClick={() => {
                navigate("/volunteer");
              }}
              className="px-4 py-3 flex gap-2 font-bold items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <MdEventNote size={18} className=" font-bold" />
              </section>
              <p>Events</p>
            </li>
            <li
              onClick={() => {
                navigate("/volunteer/my-application");
              }}
              className="px-4 py-3 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <IoDocumentText size={18} />
              </section>
              <p>My Application</p>
            </li>
            <li
              onClick={() => {
                navigate("/volunteer/profile");
              }}
              className="px-4 py-2 flex gap-2 items-center cursor-pointer hover:bg-[#047294] hover:text-white transition-colors"
            >
              <section>
                <ImProfile size={17} />
              </section>
              <p>Profile</p>
            </li>
          </ul>
        </div>

        <div className="overflow-y-auto w-[85%] h-full px-5 bg-[#f6f6f6] p-4">
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
              </div>
            ))}
          </Carousel>

          <div className="flex justify-end gap-4">
            <input
              className="px-3 py-2.5 text-sm rounded w-[25%] focus:outline-none border"
              placeholder="Search for name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="px-3 py-2.5 text-sm rounded w-[25%] focus:outline-none border"
              placeholder="Search for location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-[radial-gradient(circle_at_center,_#04687f,_#035466)] hover:brightness-110 hover:font-semibold text-white px-5 py-2 rounded text-xs transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mt-4">
            {data?.map((item, index) => {
              return <EventCard key={index} data={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
