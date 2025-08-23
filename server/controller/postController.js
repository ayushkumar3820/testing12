import Post from "../model/post";

export const PostController = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(403).json({ message: "All filed are required" });
    }

    const post = await Post.findOne({ title });
    if (!post) {
      return res
        .status(409)
        .json({ message: "title are already create with this name " });
    }

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      date,
    });

    await newPost.save();
    return res
      .status(201)
      .json({ message: "post are working ", title, content, author });
  } catch (error) {
    next(error);
  }
};

export const postGetController = async (req, res, next) => {
  try {
    const post = await Post.find({})
      .populate("author", "name avatar")
      .sort({ date: -1 });
    if (!post) {
      return res
        .status(409)
        .json({ message: "post message date are not correct  get" });
    }

    return res.status(200).json({ message: "data are get in post ", post });
  } catch (error) {
    next(error);
  }
};

export const postGetById = async (req, res, next) => {
  try {
    const post = await Post.findById({}).populate("author", "name avatar");
    if (!post) {
      return res
        .status(403)
        .json({ message: "post are not correct get by id data" });
    }
    return res.status(200).json({ message: "date get by id ", post });
  } catch (error) {
    next(error);
  }
};

export const postPutController = async (req, res, next) => {
  try {
    const { id } = req.param;
    const { title, content } = req.body;

    const update = await Post.findByIdAndUpdate({});
  } catch (error) {
    next(error);
  }
};

export const postDeleteController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
