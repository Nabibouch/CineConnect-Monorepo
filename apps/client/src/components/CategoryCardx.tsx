import Cardicon from "./categorycard/categorycard";

import { useNavigate } from '@tanstack/react-router'

const slugify = (title: string) =>
  title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")

  const CategoryCard = () => {
  const navigate = useNavigate()

  const handleClick = (title: string) => {
    navigate({ to: '/categories/$slug', params: { slug: slugify(title) } })
  }

    return(

      <div>
  <div className="mb-8">
    <h2 className="text-3xl text-white uppercase">
    Film <span className="text-rose-500">Categories</span>
    </h2>
    <div className="w-16 h-1 bg-rose-500 mt-2" />
  </div>

  <div className="flex flex-wrap gap-3 justify-center">
        <Cardicon 
        
        title="Science Fiction"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/4_p5aoit.png"
        bg_color="bg-purple-500"
        onClick={() => handleClick("Science Fiction")}

        />

        <Cardicon 
        
        title="Aventure"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604860/3_p8pkip.png"
        bg_color="bg-red-500"
        onClick={() => handleClick("Aventure")}
        />

        <Cardicon 
        
        title="Drame"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604862/1_yqp9rr.png"
        bg_color="bg-[#00C0E8]"
        onClick={() => handleClick("Drame")}
        />


        <Cardicon 
        
        title="Horreur"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/2_dky9er.png"
        bg_color="bg-[#730E27]"
        onClick={() => handleClick("Horreur")}
        /> 

        <Cardicon 
        
        title="Crime"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/9_fxvpxs.png"
        bg_color="bg-[#AC7F5E]"
        onClick={() => handleClick("Crime")}
        /> 

        <Cardicon 
        
        title="Mystere"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/8_cxw7pt.png"
        bg_color="bg-[#20F1C0]"
        onClick={() => handleClick("Mystere")}
        /> 

         <Cardicon 
        
        title="Comedie"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/5_zm5laa.png"
        bg_color="bg-[#34c579]"
        onClick={() => handleClick("Comedie")}
        /> 

         <Cardicon 
        
        title="Fantasy"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/7_zspbt9.png"
        bg_color="bg-[#FC0]"
        onClick={() => handleClick("Fantasy")}
        /> 

        <Cardicon 
        
        title="Romance"
        highlight=""
        image="https://res.cloudinary.com/dc4gctzct/image/upload/v1774604861/6_yknsaz.png"
        bg_color="bg-[#08F]"
        onClick={() => handleClick("Romance")}
        /> 
  </div>
</div>
           
    )
}

export default CategoryCard;