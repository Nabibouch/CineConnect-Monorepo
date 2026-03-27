import Icon from "./footerelement/footericon";
import Footerlinks from "./footerelement/footerlinks";
import Subst from "./footerelement/subtitle";

const Footer = () => {
    return(
        <footer className='flex items-start bg-slayer h-72 pt-4'>
                        
            <div className="mx-28 flex flex-col">
                <Subst  />
                    <Icon />
            </div>

            <div className="flex flex-row justify-between gap-40">            
                <Footerlinks title='QUICK' title2="LINKS" links={["Home","Actors","Compressions","movies","services"]}/>
                <Footerlinks title='' title2="support" links={["faqs","terms of use","privacy and policy"]}/>
                <Footerlinks title='' title2="article" links={["Blogs","careers",]}/>
            </div>          
                     
        </footer>
    )
};
export default Footer;
