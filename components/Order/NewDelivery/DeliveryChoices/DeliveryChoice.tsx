import { FiCheck } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { ChoiceType } from "../../hooks/useDeliveryChoice";

interface ChoicesProps {
  handleDeliveryOption: (deliveryChoice: ChoiceType) => void;
  deliveryOption: string;
  choiceType: ChoiceType;
  MainIcon: IconType;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  recommended?: boolean;
}
export const DeliveryChoices: React.FC<ChoicesProps> = ({
  handleDeliveryOption,
  deliveryOption,
  MainIcon,
  choiceType,
  children,
  className,
  disabled,
  recommended
}) => {
  const handleClick = () => {
    if (disabled) {
      return null;
    }
    handleDeliveryOption(choiceType);
  };
  return (
      <div className="w-full" onClick={handleClick}>
        <div
          className={`${className} flex flex-col  items-center border  bg-white  dark:border-opacity-20 dark:bg-secondary-dark dark:text-slate-100 overflow-hidden ${disabled || recommended ? 'justify-start ' : 'justify-center'}  w-full h-40 md:h-44  rounded-lg  ${
            deliveryOption === choiceType.choice ||
            (!deliveryOption && !disabled) 
              ? "border-primary-color  border-2 dark:border-white"
              : "text-secondary-dark  border-slate-300 dark:border-slate-100"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} `}
        >
          {recommended && (
            <span
              className={`flex items-center justify-center h-6 mb-4 font-medium text-center  text-[12px]   bg-primary-color border border-primary-color      text-white  w-full`}
            >
              <p >Recommended</p>
            </span>
          )}
          {disabled && (
            <span
              className={`flex items-center justify-center h-6 mb-4 font-medium text-center  text-[12px]   bg-red-500   text-white  w-full`}
            >
              <p>Not available</p>
            </span>
          )}
          <div className={`flex flex-col items-center justify-center ${disabled? 'opacity-30 dark:opacity-20': ''}`}>

          <MainIcon
            className={`text-3xl mb-2 ${
              deliveryOption === choiceType.choice ||
              (!deliveryOption && !disabled)
                ? "text-primary-medium"
                : "text-[#413e3e] dark:text-slate-300"
            }`}
          />
          <p className="font-bold text-[12px] md:text-sm text-center">
            {choiceType.choice.toUpperCase()}
          </p>
          {children}
          </div>

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
        </div>
      </div>
    
  );
};
