import Image from "next/image";
import { useState } from "react";

const Message = ({ children, description, authorAvatar, authorName }) => {
  const [toggleSee, setToggleSee] = useState(false);
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
        <div
          className="text-gray-800/80 text-[16px] my-4"
          onClick={() => {
            setToggleSee(!toggleSee);
          }}
        >
          {description.length > 150
            ? `${description.slice(0, toggleSee ? -1 : 150)}... `
            : `${description}`}
          {description.length > 150 && (
            <a
              onClick={() => setToggleSee(!toggleSee)}
              className="text-blue-400 underline select-none cursor-pointer"
            >
              {!toggleSee ? "Read more" : "See less"}
            </a>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Message;
