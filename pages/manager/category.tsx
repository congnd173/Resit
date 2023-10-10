import Button from "@/components/Button";
import useCategories from "@/hooks/useCategories";
import useCategoryModal from "@/hooks/useCategoryModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

const Category = () => {
  const [isLoading, setIsloading] = useState(false);
  const categoryModal = useCategoryModal();
  const { data: categories = [] } = useCategories();
  const router = useRouter();
  const { data: current } = useCurrentUser();

  const onDelete = useCallback(
    (id: string) => {
      try {
        setIsloading(true);
        axios.delete(`/api/category/${id}`);
        toast.success("Deleted");
        router.reload();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsloading(false);
      }
    },
    [router]
  );

  if (current?.currentUser.role !== "QA_MANAGER") {
    return (
      <>
        <div className="text-white flex justify-center flex-col items-center gap-2 mt-16 ">
          <h1 className="font-medium text-2xl">
            You do not have permission to this page
          </h1>
          <Button onClick={() => router.push("/")} label="Back to main page" />
        </div>
      </>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <Button
        label="Add a new category"
        onClick={() => categoryModal.onOpen()}
      />
      <table className=" border border-gray-800 min-w-full text-left text-sm font-light bg-white p-2 rounded-lg overflow-hidden">
        <thead className="border-b font-medium border-gray-300 bg-gray-200">
          <tr>
            <th scope="col" className="px-1 py-4 text-center">
              No.
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Name
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Number of posts
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any, index: number) => (
            <tr key={category.id} className="border-b">
              <td className="whitespace-nowrap px-1 py-4 text-center">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                {category.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                {category.posts.length}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
                <Button
                  label="Delete"
                  onClick={() => onDelete(category.id)}
                  disabled={isLoading}
                  danger
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
