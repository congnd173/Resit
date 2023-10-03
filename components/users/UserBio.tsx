import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";

import { format } from "date-fns";
import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: current } = useCurrentUser(); //ok tạm rứa đi. nếu có dùng currentUser thì sửa lại như ri xong current.currentUser
  const { data: fetchedUser } = useUser(userId); // vì có nhiều kiểu user khách nhau nên cứ là tùy xem hắn trả về chi r mình gọi ra sau, cái fetchedUser t k chắc nên là để đó coi sau

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createAt = useMemo(() => {
    if (!fetchedUser?.createAt) {
      return null;
    }

    return format(new Date(fetchedUser.createAt), "MMMM yyyy");
  }, [fetchedUser?.createAt]);

  console.log(fetchedUser?.FollowingIds);
  

  return (
    <div className="border-b-[1px] border-gray-800 pb-4">
      <div className="flex justify-end p-2">
        {current.currentUser.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow} 
            label={isFollowing ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>

          <p className="text-md text-gray-500">@{fetchedUser?.username}</p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>

          <div className="flex flex-row items-center gap-2 mt-4 text-gray-500">
            <BiCalendar size={24} />
            <p>Joined {createAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.FollowingIds?.length}</p>
            <p className="text-gray-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-gray-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
