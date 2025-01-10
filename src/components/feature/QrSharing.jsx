import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { ScanQrCode } from "lucide-react";
import {
  FacebookIcon,
  FacebookShareButton,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { Button } from "../ui/button";


function QrSharing({ link , title }) {

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(link);
  }

  const handleCopyQR = () => {
    const qrCodeSVG = document.getElementById("qr-code-image");
    const svgData = new XMLSerializer().serializeToString(qrCodeSVG);
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
          .then(() => alert("QR code copied to clipboard!"))
          .catch((err) => console.error("Error copying QR code:", err));
      });
    };
  };
  
  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center">
          <ScanQrCode className="h-6 w-6" />
        </DialogTrigger>
        <DialogContent className="w-full min-w-96 bg-white !rounded overflow-hidden">
          <DialogHeader className="flex flex-col items-center w-full">
            <DialogTitle className="text-center text-3xl mb-2">Sharing QR link</DialogTitle>
            <DialogDescription>
              <QRCodeSVG value={link} className="mx-auto" id="qr-code-image"/>
              <div className="my-4 flex flex-wrap justify-center space-x-2">
                <FacebookShareButton
                  url={link}
                  hashtag={title}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>

                <EmailShareButton
                  url={link}
                  body={title}
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>

                <TwitterShareButton
                  url={link}
                  title={title}
                >
                  <XIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={link}
                  title={title}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <WhatsappShareButton
                  url={link}
                  title={title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  url={link}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <RedditShareButton
                  url={link}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </div>
              <div className="mb-4 flex justify-center space-x-4">
                  <Button variant='outline' onClick={handleCopyLink} className="mr-2">Copy Link</Button>
                  <Button  onClick={handleCopyQR}>Copy QR</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default QrSharing;
