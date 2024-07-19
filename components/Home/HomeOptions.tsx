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
}: {
  image: StaticImageData;
  title: DeliveryOptions;
  selected: DeliveryOptions;
  loading: boolean;
  handleLoading: (selected: DeliveryOptions) => void;
}) => {
  return (
    <Container
      className="flex flex-col items-center justify-end w-full h-36 md:h-52 rounded-xl  hover:opacity-80 cursor-pointer relative font-medium"
      onClickFunc={() => handleLoading(title)}
    >
      {title === selected && loading && (
        <div className="right-0 left-0 top-0 bottom-0 mt-1 ml-1 absolute">
          <Loader color="text-primary-color" />
        </div>
      )}

      <div className="md:w-44 w-32 flex items-center justify-center">
        <Image src={image} alt={`image`}></Image>
      </div>
      <div className="w-full  rounded-b-xl shadow-md h-10 flex items-center justify-center  text-sm">
        {title}
      </div>
    </Container>
  );
};
