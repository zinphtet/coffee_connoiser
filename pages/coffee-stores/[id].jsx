import React from 'react'
import { useRouter } from 'next/router'
import style from './dynamic.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {GoLocation } from "react-icons/go";
import { MdNearMe ,MdStarRate} from "react-icons/md";
import dummyData from '../../public/dummyData'
import Button from '../../components/Button/Button'
import { useState ,useEffect} from 'react'
import Head from 'next/head'
import fetchData from '../../public/fetchData/fetchData'
import { ObjectKeys } from '../../public/utils/utils'
import { StoresContext } from '../../public/Context/StoreContext'
import { useContext } from 'react'
import useSWR from 'swr'
export async function getStaticPaths() {
  const data = await fetchData(
		'96.093292',
		'21.954510',
		'coffee shops',
		10
	);
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
  const data = await fetchData(
		'96.093292',
		'21.954510',
		'coffee shops',
		10
	);
  // const router = useRouter();
  // const {id} = router.query;
  // const curPost = dummyData.find((post)=>post.id.toString()===id)
  const {id} = params
  // console.log('STATIC PROPS ',staticProps)
  return {
    // Passed to the page component as props
    props: { post: data.find((item)=>item.id.toString() === id)||{} },
  }
}

const DynamicShop = ({post}) => {
  const [star , setStar] = useState(0)
  const [curPost , setcurPost] = useState(post)
  const {state} = useContext(StoresContext)
//  console.log('DYANIC COFFEE ',state)
    const router = useRouter()
    const { id } = router.query

    const handleCreateStores = async ({id,name,imgUrl,street,nearby})=>{
      const data = {
        id,
        name,
        imgUrl,
        street,
        nearby,
        voting :0
      }
       const response = await fetch('/api/createCoffeeStores',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      // const storedData = await response.json()
    
    }

    useEffect(()=>{
      // console.log("OBJECT KEYS" , ObjectKeys(curPost))
      // console.log("FIRST USEEFFECT")
      if( curPost && Object.keys(curPost).length === 0 ){
        const myPost = state.nearCoffeeShops.find((item)=>item.id.toString() === id )
        if(myPost){
          setcurPost(myPost)
          handleCreateStores(myPost)
        }
      }
    },[id])


    if(router.isFallback){
      return <div>Loading ....</div>
    }


    const fetcher = (...args) => fetch(...args).then(res => res.json())
    // console.log("ID " , id)
    const {data , error} = useSWR(`/api/getCoffeeStoreById?id=${id.toString()}`,fetcher)
    useEffect(()=>{
      // console.log("SEC USEEFFECT")
      // console.log("Data", data)
      if( data && data.length>0){
        setcurPost(data[0])
        setStar(data[0].voting)
      }else{
        setcurPost({})
      }
      // const fetchFromAirtable = async()=>{
      //    const data = await fetch(`/api/getCoffeeStoreById?id=${id}`)
      //    console.log('Fetched From Airtable')
      //    const finalData = await data.json()
      //    setcurPost(finalData[0])
      //   console.log("Data" , finalData)
      // }
      // fetchFromAirtable()
    },[data])


 

  // console.log("CURRENT PROPS ",post)
  // const {name , imgUrl ,street , nearby} =curPost
  const handleVote = async ()=>{
    // console.log('current Vote' , curPost.voting)
    setStar(prev =>prev+1)
    const updatedData = await fetch(`/api/voteShop`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        recId : curPost.recordId,
        voting : star+1
      }) // body data type must match "Content-Type" header
    })
   
  }
  
if(error){
  return <div>Something Wrong ....</div>
}
  return (
    <>
    <Head>
      <title>{curPost.name || ''}</title>
    </Head>
   <div className={style.dynamic_shop}>
       <p className={style.back_home}>
            <Link  href="/" scroll={false}>
            <a>   &larr; Back to Home </a>
            </Link>   
       </p>

       <div className={style.detail_page}>
          <h3 className={style.title}>
           {curPost.name || ""}
          </h3>
          <div className={style.info}>
             <div className={style.img_container}>
                <Image src={curPost.imgUrl}  layout='fill' className={style.img}
                objectFit='cover'
                alt='coffee store'
                 />
             </div>
             <div className={style.glass_info}>
                   <div className={style.location}>
                     <GoLocation/> <p>{curPost.street||''}</p> 
                   </div>
                   <div className={style.nearby}>
                     <MdNearMe/>  <p> {curPost.nearby ||''} </p>
                   </div>
                   <div className={style.star}>
                     <MdStarRate/> <p> {star }</p>
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