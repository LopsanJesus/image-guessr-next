import CityIcon, { CityIconColor } from "@/assets/CityIcon/CityIcon";
import CountryIcon, { CountryIconColor } from "@/assets/CountryIcon/CountryIcon";
import MonumentIcon, { MonumentIconColor } from "@/assets/MonumentIcon/MonumentIcon";

const getColor = (type) => {
  switch (type) {
    case "city":
      return CityIconColor;
    case "country":
      return CountryIconColor;
    case "monument":
      return MonumentIconColor;
    default:
      return CityIconColor;
  }
};

const getIcon = (type) => {
  switch (type) {
    case "city":
      return <CityIcon />;
    case "country":
      return <CountryIcon />;
    case "monument":
      return <MonumentIcon />;
    default:
      return <CityIcon />;
  }
};

const ImageTypeIcon = ({ imageType, isStored, text }) => {
  return (
    <div
      className={`${
        text ? "rounded-t-lg" : "rounded-lg"
      } flex flex-row justify-center ${
        !isStored ? getColor(imageType) : "bg-green-500"
      }`}
    >
      <div
        className={`p-2 flex items-center flex-grow-0 ${text ? "ml-3" : ""}`}
      >
        {getIcon(imageType)}
      </div>

      {text && (
        <span className="font-bold text-2xl text-white my-4 mr-4 flex-grow">
          {text}
        </span>
      )}
    </div>
  );
};

export default ImageTypeIcon;
