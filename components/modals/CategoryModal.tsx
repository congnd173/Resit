import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../Input";
import Modal from "../Modal";
import useCategoryModal from "@/hooks/useCategoryModal";

const CategoryModal = () => {
  const categoryModal = useCategoryModal();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/category", {
        name,
      });
      toast.success("New category created");
      categoryModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [categoryModal, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Category name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={categoryModal.isOpen}
      title="Add new category"
      actionLabel="Add"
      onClose={categoryModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default CategoryModal;
