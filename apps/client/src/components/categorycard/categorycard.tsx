interface Cardicon{
    title: string,
    image: string,
    bg_color: string,
    highlight:string,
    onClick?: () => void,
}

const Cardicon = ( { title, image, highlight, bg_color= "bg-purple-500", onClick}: Cardicon) => {
    return(
        <div onClick={onClick} >
            <div className={`w-[406px] h-[242px] rounded-3xl ${bg_color} overflow-hidden relative transition-transform duration-300 ease-out hover:scale-[1.03] hover:cursor-pointer`}>
            <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0"/>
            <span className="text-white text-5xl p-4 m-4">{title}<span className="text-red-500">{highlight}</span></span>
            </div>


        </div>


    )
}
export default Cardicon;