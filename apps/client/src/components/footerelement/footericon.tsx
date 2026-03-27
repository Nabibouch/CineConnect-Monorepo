import { RiGithubFill, RiFacebookCircleFill ,RiLinkedinBoxFill, RiTwitterXFill   } from '@remixicon/react';

const Icon = () => {


    return(
        <div>
        <p className='text-red-500 text-[24px]'>follow us on:</p>
        <div className='flex flex-row items-start justify-between text-white'>
            
        <RiGithubFill  size={64}/>
        <RiFacebookCircleFill size={64}/>
        <RiLinkedinBoxFill size={64}/>
        <RiTwitterXFill size={64}/>

        </div>
        </div>
    
)
}
export default Icon;