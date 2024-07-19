import { IoCopyOutline } from "react-icons/io5";
import { FaTelegram, FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Container from "@/components/ui/container";
import { copyToClipBoard } from "@/lib/utils";
import { FaFacebook } from "react-icons/fa";
import toast, {Toaster} from "react-hot-toast";
export default function ShareHailit() {
  const shareUrl = "https://hailit.vercel.app";
  const title = "Hailit";
  const inputAndLabelDivClass = "w-full  items-center";
  const labelClass = "text-md font-medium mb-2";

  const handleCopyLink = (link:string)=> {
    copyToClipBoard(link)
    toast.success(
      
      <p className=" text-[13px]">
        <b>Hailit</b> Link Copied!
              </p>
    
      )
  }
  return (
      <div className="flex flex-col items-center justify-center w-full space-y-6 p-5 ">
        <div>
          <h3 className="font-bold text-2xl mb-2">Share Hailit!</h3>
          <p className="text-[14px] ">
            Tell people about Hailit. Share to them via different platform by
            using the links. You can also copy the link directly and share.
          </p>
        </div>
        <div className={inputAndLabelDivClass}>
          <h3 className={labelClass}>Share on Social Media</h3>
          <span className="flex gap-4">
            <FacebookShareButton url={shareUrl} title={title}>
              <FaFacebook className="text-3xl text-primary-color" />
            </FacebookShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
              <IoLogoWhatsapp className="text-3xl text-green-500" />
            </WhatsappShareButton>

            <TelegramShareButton url={shareUrl} title={title}>
              <FaTelegram className="text-3xl text-cyan-500" />
            </TelegramShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
              <FaSquareXTwitter className="text-3xl text-slate-800 dark:text-white" />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} title={title}>
              <FaLinkedin className="text-3xl text-cyan-700" />
            </LinkedinShareButton>

            <EmailShareButton url={shareUrl}>
              <MdEmail className="text-3xl text-slate-800 dark:text-white" />
            </EmailShareButton>
          </span>
        </div>
        <div className={inputAndLabelDivClass}>
          <h3 className={labelClass}>Copy Link</h3>
          <div className="flex gap-2 w-full h-12">
            <Container className="flex items-center justify-center w-full text-[13px] rounded-lg p-1">
              <p className="opacity-70 truncate">
                https://hailit.vercel.app
              </p>
            </Container>
            <div className="border border-slate-300 hover:bg-slate-200 dark:border-opacity-20 dark:bg-secondary-dark flex items-center justify-center text-lg w-1/4 rounded-lg cursor-pointer hover:dark:bg-primary-dark" onClick={()=>handleCopyLink("https://hailit.vercel.app")}>

              <IoCopyOutline />
            </div>
            <Toaster/>
          </div>
        </div>
      </div>
    
  );
}
