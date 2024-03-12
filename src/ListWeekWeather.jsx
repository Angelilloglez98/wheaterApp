import './ListWeekWeather.css'


const getDateTomorrow=()=>{
    let date = new Date()

    let day = date.getDate()<10?'0'+(date.getDate()+1):(date.getDate()+1);
    let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):date.getMonth()+1
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
    
}

const getDateToday=()=>{
    let date = new Date()

    let day = date.getDate()<10?'0'+(date.getDate()):(date.getDate());
    let month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):date.getMonth()+1
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
    
}

const images={
    Clear:'/src/assets/Clear.png',
    'overcast clouds':'/src/assets/HeavyCloud.png',
    'haze':'/src/assets/foggy.png',
    'clear sky':'/src/assets/Clear.png',
    'few clouds':'/src/assets/LightCloud.png',
    'broken clouds':'/src/assets/LightCloud.png',
    'drizzle':'/src/assets/LightRain.png',
    'scattered clouds':'/src/assets/LightCloud.png',
    'light rain':'/src/assets/LightRain.png',
    'rain':'/src/assets/LightRain.png',
    'moderate rain':'/src/assets/HeavyRain.png',
    'fog':'/src/assets/foggy.png',
    'snow':'/src/assets/Snow.png',
    'mist':'/src/assets/foggy.png',
    'thunderstorm':'/src/assets/Thunderstorm.png'
}


export function ListWeekWeather({data,temperature}) {
    
    const groupByDate = (data) => {
        const groupedData = {};

        if (data.list!=undefined) {
            
            data.list.forEach((item) => {
                const date = item.dt_txt.split(' ')[0];
                
                if (!groupedData[date] && date!=getDateToday()) {
                    groupedData[date] = item;
                }
            });

        }
        return groupedData;
    };
    
    const groupedData = groupByDate(data);
    
    return (
        
        <div className="listWeekWeather">
            {
                Object.keys(groupedData).map((key) => (
                        
                    <div key={key} className={`${key} cardList`}>
                        
                        <p>{key==getDateTomorrow()?'tomorrow':key}</p>
                        <img src={images[groupedData[key].weather!=undefined?groupedData[key].weather[0].description:'']}></img>
                        <p>{groupedData[key].weather[0].main}</p>
                        <div style={{display:'flex',justifyContent:"space-around"}}>
                            <span className="min">{temperature=='°C'?parseInt(groupedData[key].main.temp_min-273)+temperature:parseInt(groupedData[key].main.temp_min)+temperature}</span>
                            <span className="max">{temperature=='°C'?parseInt(groupedData[key].main.temp_max-273)+temperature:parseInt(groupedData[key].main.temp_max)+temperature}</span>
                            
                        </div>
                    </div>
                ))
                
            }
        </div>
        
    );
}