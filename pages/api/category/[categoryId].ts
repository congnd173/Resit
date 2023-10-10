import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    if (currentUser.role !== "QA_MANAGER") {
      return res.status(500).end();
    }

    const { categoryId } = req.query;
    if (!categoryId || typeof categoryId !== "string") {
      throw new Error("Invalid ID");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        posts: true,
      },
    });

    if (category?.posts && category?.posts?.length > 0) {
      return res.status(400).end();
    }

    const deleteCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return res.status(200).json(deleteCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
