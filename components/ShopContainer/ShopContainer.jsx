import React from 'react'
import style from './ShopContainer.module.css'
import ShopItem from '../ShopItem/ShopItem'
// import dummyData from '../../public/dummyData'



  // console.log('coffeeStores ',coffeeStores)
  // return (
  //   <div className={style.shop_container}>
  //      <h2 className={style.container_title}>Toronto Stores</h2>
  //      <div className={style.stores}>
  //       {
  //         dummyData.map(({...props},idx)=><ShopItem key={idx} {...props} />)
  //       }
  //           {/* <ShopItem/>
  //           <ShopItem/>
  //           <ShopItem/>
  //           <ShopItem/>
  //           <ShopItem/>
  //           <ShopItem/>
  //           <ShopItem/> */}
  //      </div>
  //   </div>
  // )

//   export async function getStaticProps(context) {
//     console.log( 'DUMMY DATA',dummyData)
//    return {
//      props: {
//        dummyData,
//        hello : 1, 
//        world : 2,
//      }, 
//    }
//  }


  export default function ShopContainer({data}){
  //  console.log(props)
      return (
      <div className={style.shop_container}>
        <h2 className={style.container_title}>Toronto Stores</h2>
        <div className={style.stores}>
          {
            data.map(({...props},idx)=><ShopItem key={idx} {...props} />)
          }
              {/* <ShopItem/>
              <ShopItem/>
              <ShopItem/>
              <ShopItem/>
              <ShopItem/>
              <ShopItem/>
              <ShopItem/> */}
        </div>
      </div>
    )

  }

  