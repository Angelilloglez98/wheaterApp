import { useEffect, useState } from 'react'

import './App.css'
import { CurrentWeather } from './CurrentWeather';
import { ListWeekWeather } from './ListWeekWeather';
import { WindStatus } from './windStatus';
import { Humidity } from './Humidity';
import { Visibility } from './Visibility';
import { AirPressure } from './airPressure';



//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=6950d46e006c692a9ba724736ec24d3c   api current weather by lat and lon


//https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6950d46e006c692a9ba724736ec24d3c     api current weather by country
 



function App() {
  const[latitudLongitudData,setLatitudLongitudData]=useState({lat:'44.34',lon:'10.99'});
  const [location,setLocation]=useState('london');
  const [currentData,setCurrentData]=useState({});
  const [weekData,setWeekData]=useState({});
  const [temperature,setTemperature]=useState('°C');
  
  useEffect(()=>{

    const getDataByCountry=async()=>{  
      const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6950d46e006c692a9ba724736ec24d3c`)
      const data=await response.json();
      setCurrentData({...data});
    }
    const getDataWeekByCountry=async()=>{  
      const response= await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&cnt=40&appid=6950d46e006c692a9ba724736ec24d3c`)
      const data=await response.json();
      setWeekData({...data});
    }
    
    getDataByCountry();
    getDataWeekByCountry();
  },[location])

  useEffect(()=>{
    const getDataByLatAlt=async()=>{
      const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudLongitudData.lat}&lon=${latitudLongitudData.lon}&appid=6950d46e006c692a9ba724736ec24d3c`)
      const data=await response.json();
      setCurrentData({...data});
    }

    const getDataWeekByLatAlt=async ()=>{
      const response= await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitudLongitudData.lat}&lon=${latitudLongitudData.lon}&cnt=40&appid=6950d46e006c692a9ba724736ec24d3c`)
      const data=await response.json();
      setWeekData({...data});
    }

    getDataWeekByLatAlt();
    getDataByLatAlt();

  },[latitudLongitudData])
 
  const updateLocation=(ubication)=>{

    if ( typeof ubication ==='object') {
      setLatitudLongitudData({lat:ubication.lat,lon:ubication.lon});
    }else{
      setLocation(ubication);
    }
    
  }
 
  return (
    <>
      <div className='container'>
        <div className='weatherApp'>
          <div className='currentWeather'>
            <CurrentWeather location={updateLocation} currentData={currentData} temperature={temperature}></CurrentWeather>
          </div>
          <div className='weekWeather'>
            <div className='buttonsTemperature'>
              <button onClick={()=>setTemperature('°C')} className={temperature=='°C'?'selected':''}>°C</button>
              <button onClick={()=>setTemperature('°F')} className={temperature=='°C'?'':'selected'}>°F</button>
            </div>
            
            <ListWeekWeather data={weekData} temperature={temperature}></ListWeekWeather>
            <p style={{textAlign:'start'}}>Today's Higtlights</p>
            <div className='todayHigtlights'>
              <WindStatus currentData={currentData}></WindStatus>
              <Humidity currentData={currentData}></Humidity>
              <Visibility currentData={currentData}></Visibility>
              <AirPressure currentData={currentData}></AirPressure>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
