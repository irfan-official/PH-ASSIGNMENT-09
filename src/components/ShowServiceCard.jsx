import React from "react";
import "../index.css";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router";

function ShowServiceCard({
  serviceId,
  serviceName,
  providerName,
  providerEmail,
  price,
  rating,
  slotsAvailable,
  description,
  image,
  category,
}) {
  return (
    <div className="px-5  pt-4 pb-5 w-[20rem] lg:h-[28rem] h-[28rem] border flex flex-col rounded-lg gap-4 shadow text-[0.9rem] justify-between">
      <h2 className="text-center font-semibold text-lg w-full truncate">
        {serviceName}
      </h2>
      <section className="__img__ w-full  flex flex-col gap-2 justify-start ">
        <section className="__container__ relative h-full justify-start  rounded-2xl overflow-hidden">
          <img
            className="h-[14rem]  w-full bg-center object-center"
            src={image}
            alt=""
          />

          <span className="px-5 py-3 absolute bottom-0 left-0 bg-white/40 backdrop-blur-2xl flex items-center gap-2 rounded-tr-2xl overflow-hidden ">
            <span className="c">Rating: {rating}</span>
            <span className="text-yellow-400">
              <FaStar size={21} />
            </span>
          </span>
        </section>
      </section>

      <section className="__middle__ flex flex-col gap-1">
        <section className="__description__ w-full line-clamp-2">
          {description}
        </section>
      </section>

      <section className="__view_details__ w-full flex justify-center  ">
        <NavLink
          className="px-7 w-full flex items-center justify-center py-3 shadow-md text-black rounded-lg bg-blue-100 hover:bg-blue-200"
          to={`/services/${serviceId}`}
        >
          See More
        </NavLink>
      </section>
    </div>
  );
}

export default ShowServiceCard;
