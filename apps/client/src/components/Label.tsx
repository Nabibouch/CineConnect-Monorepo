type props = {
  title: string;
};

const Label = ({ title }: props) => {
  return (
    <span className="flex items-center w-fit bg-pink-200 rounded-[8px] px-[10px] py-[1px] text-black">
      {title}
    </span>
  );
};

export default Label;
