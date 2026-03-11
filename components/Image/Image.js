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
  const imgRef = useRef(null);

  // Fix cached images not firing onLoad
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  // Trigger animation when image transitions to "stored"
  useEffect(() => {
    if (!prevStored.current && isStored) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }
    prevStored.current = isStored;
  }, [isStored]);

  const borderClass = !isStored
    ? showTypeInHeader ? getBorderColor(imageType) : "border-transparent"
    : "border-green-500";

  return (
    <div
      className={`image-container relative text-center cursor-pointer ${animating ? "animate-hit" : ""}`}
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

      {/* Fixed-ratio container so all images are the same size */}
      <div className={`relative w-full rounded-lg border-4 overflow-hidden ${borderClass} transition-all duration-300`} style={{ paddingBottom: "66%" }}>
        {/* Skeleton */}
        {!loaded && (
          <div className="skeleton-pulse absolute inset-0 bg-white/10" />
        )}
        <img
          ref={imgRef}
          id={imageName}
          src={"/img/" + imageName + ".jpg"}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          alt="ImageGuessr"
        />
        {isStored && !showTypeInHeader && (
          <div className="uppercase font-extrabold rounded-xl text-green-500 bg-white p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
            {cityNameToString(imageName, t)}
          </div>
        )}
      </div>

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
