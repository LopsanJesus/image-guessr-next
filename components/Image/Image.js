"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import ImageTypeIcon from "@/components/ImageTypeIcon/ImageTypeIcon";
import CheckIcon from "@/assets/CheckIcon/CheckIcon";
import { getCityId } from "@/data/cities";

const getBorderColor = (type) => {
  switch (type) {
    case "city":      return "border-yellow-300";
    case "country":   return "border-blue-300";
    case "monument":  return "border-pink-300";
    default:          return "border-pink-300";
  }
};

const cityNameToString = (imageName, t) => {
  const cityId = getCityId(imageName);
  return t(cityId.split("-").join(" ").toUpperCase());
};

const Image = ({ imageType, imageName, isStored, onClick, showTypeInHeader }) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const prevStored = useRef(isStored);

  // Trigger animation when image transitions to "stored"
  useEffect(() => {
    if (!prevStored.current && isStored) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }
    prevStored.current = isStored;
  }, [isStored]);

  return (
    <div
      className={`image-container relative inline-block text-center cursor-pointer ${animating ? "animate-hit" : ""}`}
      onClick={() => onClick && onClick({ imageName, imageType })}
    >
      {showTypeInHeader && (
        <h2 className="w-7/12 m-auto">
          <ImageTypeIcon imageType={imageType} isStored={isStored} text={t(imageType)} />
        </h2>
      )}
      {!showTypeInHeader && (
        <div className="absolute left-0 z-10">
          <ImageTypeIcon imageType={imageType} isStored={isStored} />
        </div>
      )}

      {/* Skeleton */}
      {!loaded && (
        <div
          className="skeleton-pulse rounded-lg bg-white/10"
          style={{ width: 500, maxWidth: "100%", height: 260 }}
        />
      )}

      <img
        id={imageName}
        src={"/img/" + imageName + ".jpg"}
        width="500"
        height="600"
        onLoad={() => setLoaded(true)}
        className={`rounded-lg border-4 transition-all duration-300 ${loaded ? "block" : "hidden"} ${
          !isStored
            ? showTypeInHeader ? getBorderColor(imageType) : "border-transparent"
            : "border-green-500"
        }`}
        style={{ maxHeight: "336px" }}
        alt="ImageGuessr"
      />

      {isStored && !showTypeInHeader && (
        <div className="uppercase font-extrabold rounded-xl text-green-500 bg-white p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          {cityNameToString(imageName, t)}
        </div>
      )}

      {isStored && showTypeInHeader && (
        <h2 className="uppercase font-extrabold text-green-500 pt-4 flex flex-row justify-center">
          <span className="mr-2">{cityNameToString(imageName, t)}</span>
          <CheckIcon />
        </h2>
      )}
    </div>
  );
};

export default Image;
