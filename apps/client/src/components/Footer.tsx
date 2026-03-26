import { RiGithubFill, RiFacebookCircleFill ,RiLinkedinBoxFill, RiTwitterXFill   } from '@remixicon/react';


const Footer = () => {
    return(
        <footer className='flex items-center justify-start bg-light_slayer '>
            <div className='flex flex-col m-4 '>
                <span className='font-bold text-[40px] text-white'>Movie<span className='text-red-500'>Tune</span></span>
                <span className='text-white'>Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua</span>

                    <div>
                    <p className='text-red-500'>follow us on:</p>
                    <div className='flex flex-row justify-between px-12'>
                        <RiGithubFill />
                        <RiFacebookCircleFill />
                        <RiLinkedinBoxFill />
                        <RiTwitterXFill />

                    </div>

                    </div>

            </div>

        </footer>
    )
};

export default Footer;
