import React from 'react'
import style from './ShopContainer.module.css'
import ShopItem from '../ShopItem/ShopItem'
// import dummyData from '../../public/dummyData'
import { useEffect } from 'react'
import fetchData from '../../public/fetchData/fetchData'


  
  export default function ShopContainer({data}){
    // useEffect(()=>{
    //   const fetch = async () =>{
    //     const data = await fetchData()
    //     console.log("COFFEE STORES " , data)
    //   }
    //   fetch()
    // },[])
      return (
      <div className={style.shop_container}>
        <h2 className={style.container_title}>Mandalay Coffee Stores</h2>
        <div className={style.stores}>
          {
            data.map(({...props},idx)=><ShopItem key={idx} {...props} />)
          }
             
        </div>
      </div>
    )

  }

  


 