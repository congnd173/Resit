import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  const { currentUser } = await serverAuth(req, res);

  if (currentUser.role !== "QA_MANAGER") {
    return res.status(401);
  }

  try {
    if (req.method === "POST") {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: {
          name: name,
        },
      });
      return res.status(200).json(category);
    }
    if (req.method === "GET") {
      let categories;
      categories = await prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
        include: {
          posts: true,
        },
      });
      return res.status(200).json(categories);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
