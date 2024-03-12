import React, { useState } from 'react';
import "/src/CurrentWeather.css"

export function CurrentWeather({location,currentData,temperature}) {
    const [hidden,setHidden]=useState(false);



    const images={
        Clear:'/public/assets/Clear.png',
        'overcast clouds':'/public/assets/HeavyCloud.png',
        'haze':'/public/assets/foggy.png',
        'clear sky':'/public/assets/Clear.png',
        'few clouds':'/public/assets/LightCloud.png',
        'broken clouds':'/public/assets/LightCloud.png',
        'drizzle':'/public/assets/LightRain.png',
        'scattered clouds':'/public/assets/LightCloud.png',
        'light rain':'/public/assets/LightRain.png',
        'moderate rain':'/public/assets/HeavyRain.png',
        'fog':'/public/assets/foggy.png'
    }
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);


    
    const handleClick=(e)=>{
        e.preventDefault();
        
        if (e.target.location!=undefined) {
            location(e.target.location.value)
        }else if(e.target.value!=undefined){
            location(e.target.value)
        }
        else{
            navigator.geolocation.watchPosition((e)=>{
                location({
                    lat:e.coords.latitude,
                    lon:e.coords.longitude
                });
            });
            
        }
        
    }

    const getTemperature=()=>{
        const conversion=273;
        const temp=currentData.main!=undefined?currentData.main.temp:undefined;

        const temperatura=temperature=='°C'?parseInt(temp-conversion)+temperature:parseInt(temp)+temperature;
        return temperatura;
    }
    
    return(

        <div>
            <div hidden={hidden}>
                <div className='containerButton' hidden={hidden} style={{display:'flex',alignItems:'center',justifyContent:'center',columnGap:'3rem',padding:'3rem'}}>
                    <button onClick={()=>setHidden(!hidden)}>Search for places</button>

                    <button style={{borderRadius:'100px',padding:'5px', width:'45px', height:'45px',color:'white' }} className='CurrentLocation' onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="100%" >
                            <path  d="M519-82v-80q42-6 81.5-23t74.5-43l58 58q-47 37-101 59.5T519-82Zm270-146-56-56q26-33 42-72.5t22-83.5h82q-8 62-30.5 115.5T789-228Zm8-292q-6-45-22-84.5T733-676l56-56q38 44 61.5 98T879-520h-82ZM439-82q-153-18-255.5-131T81-480q0-155 102.5-268T439-878v80q-120 17-199 107t-79 211q0 121 79 210.5T439-162v80Zm238-650q-36-27-76-44t-82-22v-80q59 5 113 27.5T733-790l-56 58ZM480-280q-58-49-109-105t-51-131q0-68 46.5-116T480-680q67 0 113.5 48T640-516q0 75-51 131T480-280Zm0-200q18 0 30.5-12.5T523-523q0-17-12.5-30T480-566q-18 0-30.5 13T437-523q0 18 12.5 30.5T480-480Z"/>
                        </svg>
                    </button>
                    
                </div>
            </div>
            
            <div className='containerForm' hidden={!hidden}>
                <div ><label onClick={()=>setHidden(!hidden)} style={{cursor:'pointer'}}>x</label></div>
                <form onSubmit={(e)=>{handleClick(e);setHidden(!hidden)}} >
                    <div className='location'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
                        <input type="text" name="location"></input>
                    </div>
                    
                    <input type='submit' value='Search' style={{cursor:'pointer'}}></input>
                </form>
                <div style={{display:'flex',flexDirection:'column', rowGap:'1rem'}}>   
                    <input name="location" onClick={(e)=>{handleClick(e);setHidden(!hidden)}} type="text" readOnly value="London" className='option'></input>
                    <input name="location" onClick={(e)=>{handleClick(e);setHidden(!hidden)}} type="text" readOnly value="Barcelona" className='option'></input>
                    <input name="location" onClick={(e)=>{handleClick(e);setHidden(!hidden)}} type="text" readOnly value="Long Beach" className='option'></input>
                </div>
                
            </div>

            <div hidden={hidden}>
                
                <div className='containerImg'>
                    <img src={images[currentData.weather!=undefined?currentData.weather[0].description:'']} ></img>    
                </div>
                

                <p className='temperature'><span>{getTemperature()}</span></p>
                <p>{currentData.weather!=undefined?currentData.weather[0].main:''}</p>


                <p>Today - {today.toDateString()}</p>

                <p>{currentData.name}</p>
            </div>   

        </div>
    )
}

