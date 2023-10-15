import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";
import {
  Checkbox,
  Typography,
  Switch,
  Select,
  Option,
} from "@material-tailwind/react";
import useCategories from "@/hooks/useCategories";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: current } = useCurrentUser();
  const { data: categories = [] } = useCategories();
  console.log(current);

  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };
  const handleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };
  const handleSelect = (value: any) => {
    setCategoryId(value);
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body, isAnonymous, categoryId });

      toast.success("Tweet created");
      setBody("");
      setIsAnonymous(false);
      setIsChecked(false);
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    body,
    mutatePosts,
    isComment,
    postId,
    mutatePost,
    isAnonymous,
    categoryId,
  ]);

  return (
    <div className="border-b-[1px] border-gray-800 px-5 py-2">
      {current?.currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={current?.currentUser?.id} />
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between items-center">
              <Switch
                color="blue"
                crossOrigin={isAnonymous}
                onChange={handleAnonymous}
                checked={isAnonymous}
                label="Anonymous post"
              />
              <div className="w-72">
                <Select
                  label="Select category"
                  value={categoryId}
                  onChange={handleSelect}
                >
                  {categories.map((category: any) => (
                    <Option
                      key={category.id}
                      value={category.id}
                      data-id={category.id}
                    >
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-gray-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                            opacity-0 
                            peer-focus:opacity-100 
                            h-[1px] 
                            w-full 
                            border-gray-800 
                            transition"
            />
            <div className="mt-4 flex flex-row justify-between">
              <div className="flex flex-row gap-1 items-center -ml-2">
                <Checkbox
                  crossOrigin={isChecked}
                  onChange={handleCheck}
                  checked={isChecked}
                  color="blue"
                  label={
                    <Typography color="gray" className="flex font-medium">
                      I agree with the
                      <Typography
                        as="a"
                        href="#"
                        color="blue"
                        className="font-medium transition-colors hover:text-blue-700"
                      >
                        &nbsp;terms and conditions
                      </Typography>
                    </Typography>
                  }
                />
              </div>
              <Button
                disabled={isLoading || !body || !isChecked}
                onClick={onSubmit}
                label="Tweet"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Sweattter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
