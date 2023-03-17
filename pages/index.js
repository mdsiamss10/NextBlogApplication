import Message from "@/components/Message";
import Skeleton from "@/components/Skeleton";
import { db } from "@/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { PostsContext, UserContext } from "./_app";

const Home = () => {
  const { posts } = useContext(PostsContext);
  const { user } = useContext(UserContext);

  // Delete a post
  const deletePost = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const docRef = doc(db, "posts", id);
      deleteDoc(docRef)
        .then(() => {
          toast.success("Post deleted successfully");
        })
        .catch((err) => {
          toast.error("Error deleting post");
        });
    }
  };

  return (
    <>
      <div className="my-12 text-lg font-medium">
        <h2 className="text-xl font-normal mb-2 md:mb-4 text-gray-800/90">
          See what other people are saying.
        </h2>
        {posts.length ? (
          posts.map((post) => (
            <>
              {post.approved && user?.email === "ohiduzzamansiam@gmail.com" ? (
                <Message key={post?.id} {...post}>
                  {!(post.authorUID === user?.uid) && (
                    <>
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => {
                            deletePost(post.id);
                          }}
                          className="flex items-center gap-1 font-bold text-red-600 cursor-pointer select-none"
                        >
                          <AiTwotoneDelete />
                          <span>delete</span>
                        </div>
                      </div>
                    </>
                  )}
                </Message>
              ) : (
                <>{post.approved && <Message {...post} />}</>
              )}
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
