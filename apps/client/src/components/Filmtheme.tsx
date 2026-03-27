import Filmtheme from "./filmtheme/filmtheme";

const Theme = () => {

return(
    <div className="flex gap-3 justify-center">
     <Filmtheme  
        title="Science"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/4_p5aoit.png"
        bg_color="bg-purple-500"
        />

        <Filmtheme 
        
        title="Aventure"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/3_p8pkip.png"
        bg_color="bg-red-500"
        />

        <Filmtheme 
        
        title="Drame"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604862/1_yqp9rr.png"
        bg_color="bg-[#00C0E8]"
        />


        <Filmtheme 
        
        title="Horreur"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/2_dky9er.png"
        bg_color="bg-[#730E27]"
        /> 

        <Filmtheme 
        
        title="Crime"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/9_fxvpxs.png"
        bg_color="bg-[#AC7F5E]"
        /> 

        <Filmtheme 
        
        title="Mystere"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/8_cxw7pt.png"
        bg_color="bg-[#20F1C0]"
        /> 

         <Filmtheme 
        
        title="Comedie"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/5_zm5laa.png"
        bg_color="bg-[#34c579]"
        /> 

         <Filmtheme 
        
        title="Fantasy"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/7_zspbt9.png"
        bg_color="bg-[#FC0]"
        /> 

        <Filmtheme 
        
        title="Romance"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/6_yknsaz.png"
        bg_color="bg-[#08F]"
        /> 
        

       </div>
)
}
export default Theme;