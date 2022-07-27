import React from 'react'
import style from './ShopItem.module.css'
import Image from 'next/image'
import img from '../../public/coffeeshop.jpg'
import Link from 'next/link'
const ShopItem = ({id ,name ,imgUrl,}) => {
  return (
    <Link href={`/coffee-stores/${id}`}>
      <a >

            <div className={style.shop}>
              <h3 className={style.title}>{name} &rarr;</h3>
                <Image
                src={imgUrl}
                alt="Picture of the author"
                className={style.img}
                width= '250'
                height = '200'
              
              />
          </div>

      </a>
    </Link>
 
  )
}

export default ShopItem