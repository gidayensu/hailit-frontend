import { TailSpin, DNA, Blocks, InfinitySpin } from "react-loader-spinner"
export default function Loader ({color} : {color:string}) {
    return (
        <TailSpin
  visible={true}
  height="25"
  width="25"
  color={color}
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> 
    )
}

export const InfinityLoader = ()=> {
    return (
        <TailSpin
  color="red"
  width={80}
  height={80}
  
  
  /> )
}
export const SmallLoader = ({color}: {color:string})=> {
    return (
<TailSpin
  visible={true}
  height="15"
  width="15"
  ariaLabel="oval-loading"
  color={color}
  />)
}