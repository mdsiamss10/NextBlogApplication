import Message from "@/components/Message";
import Skeleton from "@/components/Skeleton";
import { useContext } from "react";
import { PostsContext } from "./_app";

const Home = () => {
  const { posts } = useContext(PostsContext);
  return (
    <>
      <div className="my-12 text-lg font-medium">
        <h2 className="text-xl font-normal mb-2 md:mb-4 text-gray-800/90">
          See what other people are saying.
        </h2>
        {posts.length ? (
          posts.map((post) => (
            <>
              <Message {...post} />
            </>
          ))
        ) : (
          <div className="p-8">
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
