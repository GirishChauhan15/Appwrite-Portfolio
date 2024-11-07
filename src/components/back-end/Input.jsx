import React, {useId, forwardRef} from "react";

function Input({ 
    label,
    type = "text", 
    ...props 
},ref) {
    const id = useId()
  return (
    <>
    {label && <label 
    htmlFor={id}>{label}</label> }
    <input 
    type={type}
    id={id}
    ref={ref}
    {...props}
    />
    </>
  );
}

export default forwardRef(Input);
