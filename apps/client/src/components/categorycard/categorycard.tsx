interface Cardicon{
    title: string,
    image: string,
    bg_color: string,
    highlight:string
}

const Cardicon = ( { title, image, highlight, bg_color= "bg-purple-500"}: Cardicon) => {
    return(
        <div>
            <div className={`w-[406px] h-[242px] rounded-3xl ${bg_color} overflow-hidden relative`}>
            <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0"/>
            <span className="text-white text-5xl p-4 m-4">{title}<span className="text-red-500">{highlight}</span></span>
            </div>


        </div>


    )
}
export default Cardicon;