import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useState } from "react";
import Button from "../Button";

interface PostFeedProps {
  userId?: string;
  filterCriteria?: string;
  categoryId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId,
  filterCriteria,
  categoryId,
}) => {
  const { data: posts = [] } = usePosts(userId);

  const [page, setPage] = useState(1);
  const pageSize = 5; // Adjust the number of posts per page as needed

  const filteredPosts = categoryId === "#"
    ? posts
    : posts.filter((post: any) => post.categoryId === categoryId);

  const sortedPosts = [...filteredPosts];
  if (filterCriteria === "mostLikes") {
    sortedPosts.sort((a, b) => b.likesIds.length - a.likesIds.length);
  } else if (filterCriteria === "mostComments") {
    sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
    } else if (filterCriteria === "latest") {
      sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
  } else if (filterCriteria === "oldest") {
  sortedPosts.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });
}

  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const postsToDisplay = sortedPosts.slice(startIdx, endIdx);

  return (
    <>
      {postsToDisplay.map((post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
      {/* Add Previous and Next Page buttons */}
      <div className="text-white flex justify-center my-3">
        {page > 1 && (
          <Button label="Previous"  onClick={() => setPage(page - 1)} />
        )}
        {endIdx < sortedPosts.length && (
          <Button label="Next" onClick={() => setPage(page + 1)}/>
        )}
      </div>
    </>
  );
};

export default PostFeed;

