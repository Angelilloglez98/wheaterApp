export function AirPressure({currentData}) {
    
    const Pressure = currentData.main!=undefined?currentData.main.pressure:undefined;

    return (
        <div className="card">
            <p>Air Pressure</p>
            <p><span style={{fontSize:'3rem'}}>{Pressure}</span> mb</p>
        </div>
    )
}