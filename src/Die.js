export default function Die(props){

    return(
        <div>
            
        <div className={`${props.isHeld ? "die--held": "die"}`} onClick={props.hold}><h2 className="die--value">{props.value}</h2></div>

        </div>
    )

}           