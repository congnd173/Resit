import { useEffect, useState } from "react";
import axios from "axios";

interface UserVote {
  value: number;
}

const useUserVote = ({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) => {
  const [userVote, setUserVote] = useState<UserVote | null>(null);

  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        const response = await axios.get(`/api/user-vote?postId=${postId}`);
        setUserVote(response.data);
      } catch (error) {
        console.error("Error fetching user vote", error);
      }
    };

    fetchUserVote();
  }, [postId, userId]);

  return userVote;
};

export default useUserVote;
