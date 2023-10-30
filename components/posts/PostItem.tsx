import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineMessage, AiFillLike, AiFillDislike } from "react-icons/ai";
import useVote from "@/hooks/useVote";
import useUserVote from "@/hooks/useUserVote";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: current } = useCurrentUser();
  const { vote } = useVote({ postId: data.id });
  // const userVote = useUserVote({ postId: data.id, userId });
  // const [voteType, setVoteType] = useState("");
  // console.log(userVote);

  // useEffect(() => {
  //   if (userVote && userVote.value === 1) {
  //     setVoteType("like");
  //   } else if (userVote && userVote.value === -1) {
  //     setVoteType("dislike");
  //   } else {
  //     // Set voteType to an empty string if userVote is null or other cases
  //     setVoteType("");
  //   }
  // }, [userVote]);

  // console.log(voteType);

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user?.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data?.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const handleVote = async (value: number) => {
    if (!current.currentUser) {
      loginModal.onOpen();
      return;
    }
    return vote(value);
  };

  return (
    <div
      className="
            border-b-[1px] 
            border-gray-800 
            p-5 
            cursor-pointer 
            hover:bg-gray-900 
            transition
            "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar
          userId={data.anonymous ? "/images/placeholder.png" : data.user?.id}
        />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={data.anonymous ? goToPost : goToUser}
              className="
                                text-white 
                                font-semibold 
                                cursor-pointer 
                                hover:underline
                            "
            >
              {data.anonymous ? "Anonymous user" : data.user?.name}
            </p>
            <span
              onClick={goToUser}
              className="
                                text-gray-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
                            "
            >
              @{data.anonymous ? "anonymous" : data.user?.username}
            </span>
            <span className="text-gray-500 text-sm">{createdAt}</span>
            <span className="text-gray-300 font-semibold text-sm">
              #{data.category.name}
            </span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                            flex 
                            flex-row 
                            items-center 
                            text-gray-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                        "
            >
              <AiFillLike size={20} onClick={() => handleVote(1)} />
              <p>{data.score}</p>
              <AiFillDislike size={20} onClick={() => handleVote(-1)} />
            </div>
            <div
              onClick={goToPost}
              className="
                            flex 
                            flex-row 
                            items-center 
                            text-gray-500 
                            gap-2 
                            cursor-pointer 
                            transition 
                            hover:text-blue-500
                        "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
