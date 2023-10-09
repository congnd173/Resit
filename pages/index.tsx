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
  }, []);
  return (
    <>
      <Header label="Home" />
      <Form placeholder="Write something" />
      <PostFeed />
    </>
  );
}
