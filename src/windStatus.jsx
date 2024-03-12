import "./windStatus.css"
export function WindStatus ({currentData}) {

    const windDeg=currentData.wind!=undefined?currentData.wind.deg:0
    const windSpeed=currentData.wind!=undefined?currentData.wind.speed:0
    return(
        <div className="card WindStatus">
            <p>Wind status</p>
            <p style={{fontSize:'1.5rem',margin:' 1rem 0'}}> <span style={{fontSize:'3rem'}}>{Math.round(windSpeed)}</span> mph</p>
            <div>
                <div className="brujula"> <span style={{rotate:`${windDeg}deg`}}></span> </div>
                <span> WSW</span>
            </div>
        </div>
    )
}