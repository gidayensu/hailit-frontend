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
          className={`${className} flex flex-col  items-center border  bg-white   dark:bg-secondary-dark dark:text-slate-100 overflow-hidden ${disabled || recommended ? 'justify-start ' : 'justify-center'}  w-full h-40 md:h-44  rounded-lg  ${
            deliveryOption === choiceType.choice  
              ? "border-primary-color   border-2 dark:border-blue-400"
              
              : "text-[#474747]  border-slate-300  dark:border-slate-100 dark:border-opacity-20"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} `}
        >
          {recommended && (
            <span
              className={`flex items-center justify-center h-6 mb-4 font-medium text-center  text-[12px]   bg-primary-color border dark:bg-blue-400 dark:text-secondary-dark border-primary-color dark:border-blue-400  text-white  w-full`}
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
              deliveryOption === choiceType.choice 
                ? "text-primary-medium dark:text-blue-400 "
                
                : "text-[#474747] dark:text-slate-300 "
            }`}
          />
          <div className={`flex flex-col ${deliveryOption === choiceType.choice ? 'text-blue-600 dark:text-blue-400 ' : ''}`}>

          <p className="font-bold text-[12px] md:text-sm text-center">
            {choiceType.choice.toUpperCase()}
          </p>
          <p >

          {children}
          </p>
          </div>
          </div>

          
        </div>
      </div>
    
  );
};
