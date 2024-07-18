import Container from "../../../ui/container";
import { IconType } from "react-icons/lib";
import { FiCheck } from "react-icons/fi";
import { ChoiceType } from "../../hooks/useDeliveryChoice";


interface ChoicesProps {
  handleDeliveryOption: (deliveryChoice: ChoiceType) => void;
  deliveryOption: string;
  choiceType: ChoiceType;
  MainIcon: IconType;
  children?: React.ReactNode;
  className?: string,
  disabled?: boolean
}
export const DeliveryChoices: React.FC<ChoicesProps> = ({
  handleDeliveryOption,
  deliveryOption,
  MainIcon,
  choiceType,
  children,
  className,
  disabled
}) => {
  const handleClick = ()=> {
    if(disabled) {
      return null
    }
    handleDeliveryOption(choiceType)
  }
  return (
    <>
      <div
        className="w-full"
        onClick={handleClick}
      >
        <Container
          className={`${className} flex flex-col  items-center justify-center w-full h-40 md:h-44  rounded-lg p-3 ${
            deliveryOption === choiceType.choice || (!deliveryOption && !disabled)
              ? ""
              : "text-slate-300"
          } ${disabled ? 'cursor-not-allowed': 'cursor-pointer'} `}
        >
          <MainIcon
            className={`text-3xl mb-2 ${
              deliveryOption === choiceType.choice || (!deliveryOption && !disabled)
                ? "text-primary-medium"
                :  "text-slate-300"
            }`}
          />
          <p className="font-bold text-[12px] md:text-sm text-center">
            {choiceType.choice.toUpperCase()}
          </p>
          {children}
          
          {disabled &&
          <span
            className={`flex items-center justify-center mt-1  text-[12px]  md:w-8 h-6 w-6 rounded-full   text-secondary-color`}
          >
          <p>Unavailable</p>
          </span>
          }
          <span
            className={`flex items-center justify-center mt-1  border border-secondary-color md:h-8 md:w-8 h-6 w-6 rounded-full    ${
              deliveryOption === choiceType.choice
                ? "bg-secondary-color text-white"
                : "hidden"
            }`}
          >
            <FiCheck
              className={`${deliveryOption !== choiceType.choice && "hidden"}`}
            />
          </span>
        </Container>
      </div>
    </>
  );
};
