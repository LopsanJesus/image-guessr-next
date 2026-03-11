import ShareIcon from "@/assets/ShareIcon/ShareIcon";

const Footer = () => {
  return (
    <footer className="py-6 mt-5 flex flex-row items-center justify-center space-x-5">
      <div className="font-base text-base text-white">ImageGuessr®</div>
      <div>
        <ShareIcon />
      </div>
    </footer>
  );
};

export default Footer;
