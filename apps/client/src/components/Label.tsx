import type { LucideIcon } from "lucide-react";

type props = {
  title: string;
  icon?: LucideIcon;
};

const Label = ({ title, icon: Icon }: props) => {
  return (
    <div className="flex gap-2">
      {Icon && <Icon size={24} />}
      <span className="flex items-center w-fit bg-pink-200 rounded-[8px] px-[10px] py-[1px] text-black">
        {title}
      </span>
    </div>
  );
};

export default Label;
