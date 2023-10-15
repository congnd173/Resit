import Button from "@/components/Button";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/router";

interface DashboardProps {
  userId: string;
}

const Dashboard = ({ userId }: DashboardProps) => {
  const { data: current } = useCurrentUser();
  const router = useRouter();
  const { data: posts = [] } = usePosts(userId);
  console.log(posts);

  if (current?.currentUser.role !== "QA_MANAGER") {
    return (
      <>
        <div className="text-white flex justify-center flex-col items-center gap-2 mt-16 rounded-lg overflow-hidden">
          <h1 className="font-medium text-2xl">
            You do not have permission to this page
          </h1>
          <Button onClick={() => router.push("/")} label="Back to main page" />
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center pt-16 px-8">
      <table className=" border border-gray-800 min-w-full text-left text-sm font-light bg-white p-2">
        <thead className="border-b font-medium border-gray-300 bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-4">
              No.
            </th>
            <th scope="col" className="px-6 py-4">
              Author
            </th>
            <th scope="col" className="px-6 py-4">
              Categories
            </th>
            <th scope="col" className="px-6 py-4">
              Department
            </th>
            <th scope="col" className="px-6 py-4">
              Date
            </th>
            <th scope="col" className="px-6 py-4">
              Content
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any, index: number) => (
            <tr key={post.id} className="border-b">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{post.user.name}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {post.category.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {post.user.department}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{post.createdAt}</td>
              <td className="whitespace-nowrap px-6 py-4">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
