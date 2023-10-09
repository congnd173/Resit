import Button from "@/components/Button";
import useCategories from "@/hooks/useCategories";
import useCategoryModal from "@/hooks/useCategoryModal";

const Category = () => {
  const categoryModal = useCategoryModal();
  const { data: categories } = useCategories();
  const onClick = () => {
    categoryModal.onOpen();
  };
  console.log(categories);

  return (
    <div className="p-6 flex flex-col gap-6">
      <Button label="Add a new category" onClick={onClick} />
      <table className=" border border-gray-800 min-w-full text-left text-sm font-light bg-white p-2">
        <thead className="border-b font-medium border-gray-300 bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-4">
              No.
            </th>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Number of posts
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: any, index: number) => (
            <tr key={category.id} className="border-b">
              <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
              <td className="whitespace-nowrap px-6 py-4">{category.name}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {category.posts.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
