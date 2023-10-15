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

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body, isAnonymous, categoryId } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          anonymous: isAnonymous,
          userId: currentUser.id,
          categoryId: categoryId,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      const { currentUser } = await serverAuth(req, res);

      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else if (currentUser.role === "QA_COORDINATOR") {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
            category: true,
          },
          where: {
            user: {
              department: currentUser.department,
            },
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
