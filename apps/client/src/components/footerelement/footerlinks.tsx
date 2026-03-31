type props = {
    title: string,
    title2: string,
    links: string[]
}


const Footerlinks = (props : props) => {

    return(
        <div className=" flex flex-col items-start">
            <span className="text-white text-[38px] border-b-4 border-red-500">{props.title}<span className="text-red-500">{props.title2}</span></span>
            <ul>
                {props.links.map((el:string, index: number) => (
                    <li key={index} className="text-white text-[24px]">{el}</li>
                )) }
            </ul>
        </div>
    )
}

export default Footerlinks;