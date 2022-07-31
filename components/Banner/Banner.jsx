import React from 'react'
import style from './Banner.module.css'
import Button from '../Button/Button'
import UseCurrentLocation from '../../public/Hooks/UseLocation'
import { useContext ,useEffect} from 'react'
import { StoresContext } from '../../public/Context/StoreContext'
import { ACTION } from '../../public/Context/StoreContext'
import fetchData from '../../public/fetchData/fetchData'
const Banner = () => {
  const {state,dispatch} = useContext(StoresContext)
  const {lng , lat} = state.location;
  // console.log('STORE ', lat ,lng)
    const {locationError, geoLoading, handleLocation }  = UseCurrentLocation()
    const handleClick = async ()=>{
      handleLocation()
        // console.log('TO STRING' , lat.toString())
        // const nearbyData = await fetchData('97.527432' , '20.9899463' ,'coffee stores' ,10)
    
      // console.log('Nearby Data', nearbyData)
      // dispatch({type:ACTION.set_coffee_stores , payload : nearbyData})
    }
 useEffect(() => {
      const fetching =async ()=>{
        // const nearbyData = await fetchData(lng.toString() ,lat.toString() ,'coffee stores' ,10)
        // console.log('Nearby Data', nearbyData)
        try{
          const res = await fetch(`/api/getcoffeestores?lng=${lng}&lat=${lat}`)
          // console.log('RESPONSE', res)
          const coffeeStores =await res.json()
          console.log( 'COFFEE STORES ',coffeeStores )
          dispatch({type:ACTION.set_coffee_stores , payload : coffeeStores})
        }catch(err){
          console.log(err.message)
        }
       
        // const coffeeStores = await res.json()
        // console.log('BANNER ', coffeeStores)
        // dispatch({type:ACTION.set_coffee_stores , payload : coffeeStores})
      }
    if(lat,lng){
      fetching()
    }
 }, [lat,lng])
    // console.log(locationError , geoLoading , location)
    // dispatch({type:ACTION.set_location,payload : location})
   
  return (
    <div className={style.banner}>
       <h1 className={style.banner_title}>
         Coffee  <span> Connoisseur</span>
       </h1>
       <p className={style.banner_subtitle}>
         Discover your local coffee shops!
       </p>
       <Button text={`${geoLoading ? 'Locating...':'view nearby stores'}`} Click={handleClick}/>
        {
         locationError && <p className={style.error}>
             Error fetching Location
          </p>
        }
    </div>
  )
}

export default Banner