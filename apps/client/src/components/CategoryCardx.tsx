import Cardicon from "./categorycard/categorycard";

const CategoryCard = () => {

    return(
    <div className="flex flex-wrap gap-3 justify-center">
        <Cardicon 
        
        title="Science"
        highlight="Fiction"
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/4_p5aoit.png"
        bg_color="bg-purple-500"
        />

        <Cardicon 
        
        title="Aventure"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/3_p8pkip.png"
        bg_color="bg-red-500"
        />

        <Cardicon 
        
        title="Drame"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604862/1_yqp9rr.png"
        bg_color="bg-[#00C0E8]"
        />


        <Cardicon 
        
        title="Horreur"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/2_dky9er.png"
        bg_color="bg-[#730E27]"
        /> 

        <Cardicon 
        
        title="Crime"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/9_fxvpxs.png"
        bg_color="bg-[#AC7F5E]"
        /> 

        <Cardicon 
        
        title="Mystere"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/8_cxw7pt.png"
        bg_color="bg-[#20F1C0]"
        /> 

         <Cardicon 
        
        title="Comedie"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/5_zm5laa.png"
        bg_color="bg-[#34c579]"
        /> 

         <Cardicon 
        
        title="Fantasy"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/7_zspbt9.png"
        bg_color="bg-[#FC0]"
        /> 

        <Cardicon 
        
        title="Fantasy"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/6_yknsaz.png"
        bg_color="bg-[#08F]"
        /> 

       </div>
    )
}

export default CategoryCard;