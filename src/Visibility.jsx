
export function Visibility({currentData}) {

    const visibility = currentData.visibility;

    return (
        <div className="card">
            <p>Visibility</p>
            <p> <span style={{fontSize:'3rem'}}>{(visibility/1760).toFixed(2)}</span> Miles</p>
        </div>
    )
}