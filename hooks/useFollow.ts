import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = (userId: string) => {
    const { data: current, mutate: mutateCurrentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(userId);
  
    const loginModal = useLoginModal();
  
    const isFollowing = useMemo(() => {
        const list = current?.currentUser.FollowingIds || [];
  
        return list.includes(userId);
    }, [current?.currentUser, userId]);
  
    const toggleFollow = useCallback(async () => {
        if (!current?.currentUser) {
            return loginModal.onOpen();
        }
  
        try {
            let request;
  
            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }
    
            await request();
            mutateCurrentUser();
            mutateFetchedUser();
    
            toast.success('Success');
        } 
        catch (error) {
            toast.error('Something went wrong');
        }
    }, [current?.currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);
  
    return {
        isFollowing,
        toggleFollow,
    }
}
  
export default useFollow;