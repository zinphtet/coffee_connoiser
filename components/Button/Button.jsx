import React from 'react'
import style from './Button.module.css'
const Button = ({text='...' , Click}) => {
  return (
   <button className={style.btn} onClick ={()=>Click()}>
        {text}
   </button>
  )
}

export default Button