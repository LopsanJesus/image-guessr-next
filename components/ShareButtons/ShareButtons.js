import WhatsAppIcon from "@/assets/WhatsAppIcon/WhatsAppIcon";
import CopyLinkIcon from "@/assets/CopyLinkIcon/CopyLinkIcon";

const ShareButtons = () => {
  return (
    <div className="flex justify-center flex-row space-x-5">
      <WhatsAppIcon />
      <CopyLinkIcon />
    </div>
  );
};

export default ShareButtons;
