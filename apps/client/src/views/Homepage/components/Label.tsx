type props = {
  title: string;
};

const Label = ({ title }: props) => {
  return (
    <span className="flex items-center w-fit bg-pink-300 rounded-[8px] px-[10px] py-[1px]">
      {title}
    </span>
  );
};

export default Label;
