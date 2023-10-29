import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useCategories from "@/hooks/useCategories";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Option, Select } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: current } = useCurrentUser();
  const router = useRouter();
  const { data: categories = [] } = useCategories();


  const [filterCriteria, setFilterCriteria] = useState("");
  const [categoryId, setCategoryId] = useState("");


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

  const handleSelectFilter = (value: any) => {
    setFilterCriteria(value);
  };

  const handleSelectCategory = (value: any) => {
    setCategoryId(value);
  };

  console.log(filterCriteria);

  return (
    <>
      <Header label={label} />
      <Form placeholder="Write something" />
      <div className="flex flex-row gap-2 p-1">
        <Select label="View by" value={filterCriteria} onChange={handleSelectFilter}>
          <Option value="mostLikes" data-id="mostLikes">
            Most Like
          </Option>
          <Option value="mostComments" data-id="mostComments">
            Most Comments
          </Option>
          <Option value="latest" data-id="latest">
            Latest
          </Option>
          <Option value="oldest" data-id="oldest">
            Oldest
          </Option>
          <Option value="abc" data-id="abc">
            No filter
          </Option>
        </Select>
        <Select
          label="Select category"
          value={categoryId}
          onChange={handleSelectCategory}
        >
          {categories.map((category: any) => (
            <Option key={category.id} value={category.id} data-id={category.id}>
              {category.name}
            </Option>
          ))}
          <Option value="" data-id="">
            No filter
          </Option>
        </Select>
      </div>
      <PostFeed filterCriteria={filterCriteria} categoryId={categoryId} />
    </>
  );
}
