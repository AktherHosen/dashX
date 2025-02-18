import React, { useState } from "react";

// React Icons
import { MdLocalShipping } from "react-icons/md";
import { IoGift } from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import { RiHeartAddLine, RiHeartFill } from "react-icons/ri";

const ProductCard = ({ product }) => {
  const data = product?.data || {};

  const price = data.Price || data.price || "";
  const capacity = data.Capacity || data.capacity || "";
  const generation = data.Generation || data.generation || "";
  const description = data.Description || "";
  const color = (data.Color || data.color || "gray").toLowerCase();
  const strapColor = data["Strap Colour"] || "";
  const screenSize = data["Screen size"] || "";
  const caseSize = data["Case Size"] || "";
  const cpuModel = data["CPU model"] || "";
  const hardDisk = data["Hard disk size"] || "";

  return (
    <div className="border h-[220px]  border-gray-300 bg-darkBg w-full rounded-2xl overflow-hidden">
      <div className="p-4 pt-0 mt-4">
        <h3 className="text-[1.2rem] font-semibold mb-1 mt-2">
          {product?.name}
        </h3>

        <span className="text-[0.9rem] font-normal text-gray-500 line-clamp-2">
          <p className="text-[0.8rem] font-semibold mt-1">
            {description !== ""
              ? `${description}`
              : "Description Not Available"}
          </p>
        </span>

        <div className="flex items-center my-2 gap-[15px]">
          <p className="text-[0.8rem] font-semibold mt-1">
            {price !== "" ? `$${price}` : "Price Not Available"}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {capacity !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{capacity !== "" ? `Capacity: ${capacity}` : ""}</p>
            </div>
          )}

          {generation !== "" && (
            <div className="flex items-center gap-[6px] text-[0.8rem]">
              <p>{generation !== "" ? `Generation: ${generation}` : ""}</p>
            </div>
          )}
          {strapColor !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{strapColor !== "" ? `Strap Color: ${strapColor}` : ""}</p>
            </div>
          )}
          {screenSize !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{screenSize !== "" ? `Screen Size: ${screenSize}` : ""}</p>
            </div>
          )}
          {caseSize !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{caseSize !== "" ? `Case Size: ${caseSize}` : ""}</p>
            </div>
          )}

          {cpuModel !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{cpuModel !== "" ? `CPU: ${cpuModel}` : ""}</p>
            </div>
          )}
          {hardDisk !== "" && (
            <div className="flex items-center gap-[6px]  text-[0.8rem]">
              <p>{hardDisk !== "" ? `Hard Disk: ${hardDisk}` : ""}</p>
            </div>
          )}

          {color !== "" && (
            <div
              className="w-4 h-4 rounded-full cursor-pointer mt-2"
              style={{ backgroundColor: color }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
