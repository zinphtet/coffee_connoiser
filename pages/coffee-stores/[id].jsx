import React from 'react'
import { useRouter } from 'next/router'
import style from './dynamic.module.css'
import Link from 'next/link'
import Image from 'next/image'
import img from '../../public/coffeeshop.jpg'
import {GoLocation } from "react-icons/go";
import { MdNearMe ,MdStarRate} from "react-icons/md";
import dummyData from '../../public/dummyData'
import Button from '../../components/Button/Button'
import { useState } from 'react'
import Head from 'next/head'
import fetchData from '../../public/fetchData/fetchData'
export async function getStaticPaths() {
  const data = await fetchData()
  const pathsArr = data.map((data)=>{
    return {params :{id : data.id.toString()}}
  })
  return {
    // paths: [{ params: { id: '0' } }, { params: { id: '1' }}],
    paths:pathsArr,
    fallback:true, // can also be true or 'blocking'
  }
}

export async function getStaticProps({params}) {
  const data = await fetchData()
  // const router = useRouter();
  // const {id} = router.query;
  // const curPost = dummyData.find((post)=>post.id.toString()===id)
  const {id} = params
  // console.log('STATIC PROPS ',staticProps)
  return {
    // Passed to the page component as props
    props: { post: data.find((item)=>item.id.toString() === id) },
  }
}

const DynamicShop = ({post}) => {
    const router = useRouter()
    if(router.isFallback){
      return <div>Loading ....</div>
    }
  // const { id } = router.query
const [star , setStar] = useState(1)
  // console.log("CURRENT PROPS ",post)
  const {name , imgUrl ,street , nearby} = post
  const handleVote = ()=>setStar(prev=>prev+1)
  return (
    <>
    <Head>
      <title>{name}</title>
    </Head>
   <div className={style.dynamic_shop}>
       <p className={style.back_home}>
            <Link  href="/" scroll={false}>
            <a>   &larr; Back to Home </a>
            </Link>   
       </p>

       <div className={style.detail_page}>
          <h3 className={style.title}>
           {name}
          </h3>
          <div className={style.info}>
             <div className={style.img_container}>
                <Image src={imgUrl} layout='fill' className={style.img}
                objectFit='cover'
                 />
             </div>
             <div className={style.glass_info}>
                   <div className={style.location}>
                     <GoLocation/> <p>{street}</p> 
                   </div>
                   <div className={style.nearby}>
                     <MdNearMe/>  <p> {nearby} </p>
                   </div>
                   <div className={style.star}>
                     <MdStarRate/> <p> {star}</p>
                   </div>
                   <Button text='up Vote' Click={handleVote}/>

             </div>
          </div>
       </div>
     
   </div>
   </>
  )
}

export default DynamicShop