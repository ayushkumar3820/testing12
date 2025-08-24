import Post from "../model/post.js";

// Create Post
export const PostController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.findOne({ title });
    if (post) {
      return res
        .status(409)
        .json({ message: "A post with this title already exists" });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      date: new Date(),
    });

    await newPost.save();
    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Posts
export const postGetController = async (req, res, next) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name avatar")
      .sort({ date: -1 });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get Post by ID
export const postGetById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name avatar"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Update Post
export const postPutController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Post
export const postDeleteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
