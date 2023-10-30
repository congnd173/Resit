import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    const userVote = await prisma.vote.findFirst({
      where: {
        userId: currentUser.id,
        postId,
      },
    });

    return res.status(200).json(userVote);
  } catch (error) {
    console.error("Error fetching user vote", error);
    return res.status(400).end();
  }
}
