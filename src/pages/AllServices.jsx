import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Data_Context } from "../context/DataContext.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import ShowServiceCard from "../components/ShowServiceCard.jsx";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdReviews } from "react-icons/md";

function AllServices() {
  const { serviceData, loader } = useContext(Data_Context);

  // Read ?category=Therapy
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const [searchApp, setSearchApp] = useState("");
  const [filteredData, setFilteredData] = useState(serviceData || []);
  const [categoryFilteredData, setCategoryFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [priceSort, setPriceSort] = useState("");

  useEffect(() => {
    if (categoryFilter) {
      const data = serviceData.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
      setCurrentData(data);

      return;
    }
    if (serviceData?.length) {
      setCurrentData(serviceData);
    }
  }, [categoryFilter, serviceData?.length, loader]);

  useEffect(() => {
    if (!serviceData?.length && !currentData?.length) return; // Wait for data to load

    // 2. SEARCH FILTER (always active)
    let data = [];

    if (searchApp) {
      if (searchApp.trim()) {
        const regex = new RegExp(searchApp, "i");
        data = currentData.filter(
          (item) =>
            regex.test(item.serviceName) ||
            regex.test(item.providerName) ||
            regex.test(item.description) ||
            regex.test(item.category)
        );
      }
    }

    if (priceSort) {
      if (priceSort === "low") {
        data = [...currentData].sort((a, b) => a.price - b.price);
      } else if (priceSort === "high") {
        data = [...currentData].sort((a, b) => b.price - a.price);
      }
    }

    setFilteredData(data);
  }, [serviceData?.length, searchApp, priceSort]);

  if (loader) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center text-6xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Header */}

      <Nav />

      <div className="w-full min-h-[90vh] text-black px-6 sm:px-10 md:px-20 flex flex-col gap-7 sm:gap-10">
        {/* Page Title */}
        <section className="_title_&_info_ flex flex-col gap-20 sm:gap-30">
          <section className="_title_ flex flex-col items-center justify-center gap-7 sm:gap-4 mt-12">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#392F5A]">
                All Services
              </h1>
              <span className="text-[#632EE3]">
                <MdReviews size={44} />
              </span>
            </div>
          </section>

          {/* Search + Count + Sort */}
          <section className="_modifier_ w-full flex items-center justify-between ">
            {/* Count */}
            <h2 className="text-[#632EE3] font-semibold flex items-center gap-2 text-[0.9rem] sm:text-[1rem]">
              <span className="px-4 py-2 bg-white rounded-md shadow font-extrabold">
                {(filteredData && filteredData.length) || currentData.length}
              </span>
              <span className="underline"> Services Found</span>
            </h2>

            <span
              className={`_search_ border w-[30%] border-[#632EE3] py-2 px-3 flex justify-start items-center gap-2 rounded-md `}
            >
              <IoSearch className="text-gray-500 cursor-pointer" />

              <section className="flex w-full items-center justify-between">
                <input
                  onChange={(e) => setSearchApp(e.target.value)}
                  value={searchApp}
                  type="text"
                  className="rounded-md outline-0 text-[0.9rem] sm:text-[1rem] w-[70%] "
                  placeholder="Search Services..."
                />

                {searchApp && (
                  <RxCross2
                    onClick={() => setSearchApp("")}
                    className="cursor-pointer"
                  />
                )}
              </section>
            </span>

            {/* Price Sort */}
            <select
              className="border border-[#632EE3] px-3 py-2 rounded-md"
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="">Sort by price</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </section>
        </section>

        {/* Service Cards */}
        <section
          className="
            w-full min-h-[40vh] 
            flex flex-wrap 
            gap-10 xl:gap-5 xl:gap-y-20 2xl:gap-20 
            pb-20 pt-10 
            justify-center
          "
        >
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <ShowServiceCard key={index} {...item} />
              ))
            : currentData.map((item, index) => (
                <ShowServiceCard key={index} {...item} />
              ))}

          {!categoryFilteredData.length ||
            (!filteredData.length && (
              <p className="col-span-full text-center text-slate-500 font-semibold">
                No services found!
              </p>
            ))}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default AllServices;
