import React from 'react'

function Button({children
  ,type='submit',...props}) {
  return (
    <button
    {...props}
    type={type}
    >{children}</button>
  )
}

export default Button