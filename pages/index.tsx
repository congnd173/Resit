import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useCategories from "@/hooks/useCategories";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: current } = useCurrentUser();
  const router = useRouter();
  const { data: categories = [] } = useCategories();

  const [filterCriteria, setFilterCriteria] = useState("latest");
  const [categoryId, setCategoryId] = useState("#");

  useEffect(() => {
    if (current?.currentUser.role === "QA_MANAGER") {
      router.push("/manager/dashboard");
    }
  }, [current?.currentUser, router]);

  let label;
  if (current?.currentUser.role === "QA_COORDINATOR") {
    label = current?.currentUser.department + " Department";
  } else {
    label = "Home";
  }

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterCriteria(selectedValue);
  };

  const handleSelectCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setCategoryId(selectedValue);
    if (!selectedValue) {
      setCategoryId("");
    }
  };

  console.log(filterCriteria);

  return (
    <>
      <Header label={label} />
      <Form placeholder="Write something" />
      <div className="flex flex-row gap-4 p-3">
        <select
          value={filterCriteria}
          onChange={handleSelectFilter}
          color="blue"
          className="bg-black text-white w-full p-2 transition border-gray-100 focus:outline-none border-b"
        >
          <option value="latest">Latest</option>
          <option value="mostLikes">Most Like</option>
          <option value="mostComments">Most Comments</option>
          <option value="oldest">Oldest</option>
        </select>
        <select
          className="bg-black text-white w-full p-2 transition border-gray-100 focus:outline-none border-b"
          onChange={handleSelectCategory}
          value={categoryId}
        >
          <option value="#">No filter</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id} className="py-2">
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <PostFeed filterCriteria={filterCriteria} categoryId={categoryId} />
    </>
  );
}
