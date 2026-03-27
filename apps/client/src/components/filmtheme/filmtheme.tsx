interface Filmtheme{
    title: string,
    image: string,
    bg_color: string,
}

const Filmtheme = ( { title, image, bg_color= "bg-purple-500"}: Filmtheme) => {
    return(
        <div>
            <div className={`w-[146px] h-[56px] rounded-3xl ${bg_color} overflow-hidden relative`}>
            <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0"/>
            <span className="text-white text-xl p-4 m-4 justify-start">{title}</span>
            </div>


        </div>


    )
}
export default Filmtheme;