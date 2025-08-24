import Commit from "../model/commit.js";

// Create a Commit
export const commitPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const newCommit = new Commit({
      text,
      user: req.user.id,
      post: postId,
    });

    await newCommit.save();

    return res.status(201).json({
      message: "Commit created successfully",
      commit: newCommit,
    });
  } catch (error) {
    next(error);
  }
};

// Get all Commits for a Post
export const commitGet = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const commits = await Commit.find({ post: postId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Commits fetched successfully",
      commits,
    });
  } catch (error) {
    next(error);
  }
};
