import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: current } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (current?.currentUser.role === "QA_MANAGER") {
      router.push("/manager/dashboard");
    }
  }, [current?.currentUser, router]);

  let label;
  if (current?.currentUser.role === "QA_COORDINATOR") {
    label = current?.currentUser.department + " Deparment";
  } else {
    label = "Home";
  }

  return (
    <>
      <Header label={label} />
      <Form placeholder="Write something" />
      <PostFeed />
    </>
  );
}
