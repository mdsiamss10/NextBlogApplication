import Layout from "@/components/Layout";
import { auth, db } from "@/firebase.config";
import "@/styles/globals.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();
export const PostsContext = createContext();

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef, orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, loading }}>
        <PostsContext.Provider value={{ posts }}>
          {!loading && (
            <Layout>
              <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <Component {...pageProps} />
            </Layout>
          )}
        </PostsContext.Provider>
      </UserContext.Provider>
    </>
  );
}
