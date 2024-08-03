import { CgSpinner } from "react-icons/cg";
export default function Loader({ color }: { color?: string }) {
  return (
    <CgSpinner className={`animate-spin ${color ? color :' text-white dark:text-primary-color'}   text-2xl`} />
  );
}

export const InfinityLoader = () => {
  return <CgSpinner className="animate-spin text-primary-color text-4xl" />;
};
export const SmallLoader = () => {
  return (
    <CgSpinner className={`animate-spin text-white dark:text-primary-color text-xl`} />
  );
};
