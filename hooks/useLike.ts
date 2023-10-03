import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import axios from "axios";
import toast from "react-hot-toast";


const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: current } = useCurrentUser();
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
    const { mutate: mutateFetchedPosts } = usePosts(userId);
  
    const loginModal = useLoginModal();
  
    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likesIds || [];
    
        return list.includes(current?.currentUser.id);
    }, [fetchedPost, current?.currentUser]);
  
    const toggleLike = useCallback(async () => {
        if (!current.currentUser) {
            return loginModal.onOpen();
        }
    
        try {
            let request;
    
            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            } else {
                request = () => axios.post('/api/like', { postId });
            }
    
            await request();
            mutateFetchedPost();
            mutateFetchedPosts();
    
            toast.success('Success');
        } 
        catch (error) {
            toast.error('Something went wrong');
        }
    }, [current?.currentUser, hasLiked, postId, mutateFetchedPosts, mutateFetchedPost, loginModal]);
  
    return {
        hasLiked,
        toggleLike,
    }
}
  
export default useLike;