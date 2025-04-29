export const ProfileCard = ({href, alt}: {href: string, alt: string}) => {
  return (
    <div className="w-[300px]">
      <div className="bg-[#374559] h-[50px] flex items-center justify-end pr-4 rounded-t-[20px]">
        <p className="text-white text-sm">____syota_01</p>
      </div>
      <div>
        <img src={href} alt={alt} className="w-full h-auto aspect-square"/>
      </div>
      <div className="bg-[#374559] h-[50px] flex items-center justify-center pr-4 rounded-b-[20px]">
        <p className="text-white text-sm">AIの民主化で世界を豊かに</p>
      </div>
    </div>
  );
};