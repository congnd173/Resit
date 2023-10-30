import axios from "axios";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import toast from "react-hot-toast";
import usePosts from "./usePosts";

const useVote = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: current } = useCurrentUser();
  const { mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const vote = async (value: any) => {
    if (!current.currentUser) {
      return loginModal.onOpen();
    }

    try {
      await axios.post("/api/vote", { postId, value });
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { vote };
};

export default useVote;
