import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { postId, value } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== "string" || value === undefined) {
      throw new Error("Invalid parameters");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid post ID");
    }

    // Find if the user has already voted on this post
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: currentUser.id,
        postId: postId,
      },
    });

    // If the user has already voted, update the existing vote
    if (existingVote) {
      if (existingVote.value === value) {
        // If the value is the same, remove the vote
        await prisma.vote.delete({
          where: { id: existingVote.id },
        });
      } else {
        // If the value is different, update the vote value
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value: value },
        });
      }
    } else {
      // If the user hasn't voted, create a new vote
      await prisma.vote.create({
        data: {
          value: value,
          userId: currentUser.id,
          postId: postId,
        },
      });
    }

    // Calculate the total score (sum of vote values) for the post
    const votes = await prisma.vote.findMany({
      where: { postId: postId },
    });
    const totalScore = votes.reduce((sum, vote) => sum + vote.value, 0);

    // Update the post with the total score
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        score: totalScore,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
