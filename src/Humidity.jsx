import "./Humidity.css"
export function Humidity({currentData}) {
    const Humidity=currentData.main!=undefined?currentData.main.humidity:'undefined'
    
    return (
        <div className="card Humidity">
            <p>Humidity</p>
            <p style={{fontSize:'1.5rem',margin:' 1rem 0'}}> <span style={{fontSize:'3rem'}}>{Humidity}</span> %</p>
            <div className="containerBarra">
                <div className="numbers">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                </div>
                <div className="barra">
                    <div style={{ width: `${Humidity}%` }}></div>
                </div>
                <div className="percentage">%</div>
            </div>
        </div>
    )
}