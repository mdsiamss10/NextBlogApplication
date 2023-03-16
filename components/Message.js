import Image from "next/image";

const Message = ({ children, description, authorAvatar, authorName }) => {
  return (
    <div className="bg-white p-8 pb-6 border-b-2 rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={authorAvatar}
          alt="UserImage"
          width={35}
          height={35}
          className="rounded-full"
        />
        <h2 className="text-gray-800">{authorName}</h2>
      </div>
      <div>
        <p className="text-gray-800/80 text-[16px] my-4">{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Message;
