export type DeliveryOptions = "Express" | "Inter City" | "Custom" | "Movers" | "New Delivery" | "Track Order" |"";

import Image, { StaticImageData } from "next/image";
import Loader from "../Shared/Loader";
import Container from "../ui/container";

export const HomeOptions = ({
  image,
  title,
  selected,
  loading,
  handleLoading,
  disabled,
}: {
  image: StaticImageData;
  title: DeliveryOptions;
  selected: DeliveryOptions;
  loading: boolean;
  handleLoading: (selected: DeliveryOptions) => void;
  disabled?: boolean
}) => {
  return (
    <Container
      className={`flex flex-col items-center ${disabled ? 'justify-between' : 'justify-end hover:opacity-80'}  w-full h-36 md:h-52 rounded-xl  cursor-pointer relative font-medium`}
      onClickFunc={disabled? ()=>null : () => handleLoading(title)}
    >
      {title === selected && loading && (
        <div className="right-0 left-0 top-0 bottom-0 mt-1 ml-1 absolute">
          <Loader color="text-primary-color" />
        </div>
      )}
      {disabled &&
      
      <div className="w-full bg-red-500 text-white h-6 flex items-center justify-center  text-sm">
        <p>Not available</p>
      </div>
      }
      <div className={`${disabled? 'opacity-60 grayscale' : ''} md:w-44 w-32 flex items-center justify-center`}>
        <Image src={image} alt={`image`}></Image>
      </div>
      <div className={`${disabled ? 'opacity-50' : ''} w-full  rounded-b-xl shadow-md h-10 flex items-center justify-center  text-sm`}>
        {title}
      </div>
    </Container>
  );
};
