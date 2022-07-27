import React from 'react'
import style from './Banner.module.css'
import Button from '../Button/Button'
const Banner = () => {
    const handleClick = ()=>{}
  return (
    <div className={style.banner}>
       <h1 className={style.banner_title}>
         Coffee  <span> Connoisseur</span>
       </h1>
       <p className={style.banner_subtitle}>
         Discover your local coffee shops!
       </p>
       <Button text='view stores nearby' Click={handleClick}/>
    </div>
  )
}

export default Banner