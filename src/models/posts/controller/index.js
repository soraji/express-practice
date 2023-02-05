import { Router } from "express";
import { PostService } from "../service";
import {
  CreatePostDTO,
  CreateCommentDTO,
  CreateChildCommentDTO,
  UpdateCommentDTO,
  UpdatePostDTO,
} from "../dto";
import { pagination } from "../../../middleware/pagination";

export class PostController {
  router;
  path = "/posts";
  postService;

  constructor() {
    this.router = new Router();
    this.postService = new PostService();
    this.init();
  }

  init() {
    this.router.get("/:id", this.getPost.bind(this));
    this.router.get("/", pagination, this.getPosts.bind(this));

    this.router.post("/:postId/like", this.createLike.bind(this));
    this.router.delete("/:postId/like", this.deleteLike.bind(this));
    this.router.post("/:postId/like-combined", this.postLike.bind(this));

    this.router.post("/", this.createPost.bind(this));
    this.router.post("/comment", this.createComment.bind(this));
    this.router.post("/child-comment", this.createChildComment.bind(this));

    this.router.patch("/:postId", this.updatePost.bind(this));
    this.router.patch("/comments/:commentId", this.updateComment.bind(this));

    this.router.delete("/:id", this.deletePost.bind(this));
    this.router.delete("/comments/:commentId", this.deleteComment.bind(this));
  }
  async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPost(id, req.user);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  }

  async getPosts(req, res, next) {
    try {
      const searchValue = req.query.searchValue;
      const { posts, count } = await this.postService.getPosts(
        {
          skip: req.skip,
          take: req.take,
        },
        searchValue
      );

      res.status(200).json({ posts, count });
    } catch (err) {
      next(err);
    }
  }

  async createLike(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "권한이 없습니다" };

      const { postId } = req.params;
      await this.postService.createPostLike(req.user.id, postId);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async deleteLike(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async postLike(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "권한이 없습니다" };

      const { postId } = req.params;
      const { isLike } = req.body;
      await this.postService.createPostLike(req.user.id, postId, isLike);

      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }

  async createPost(req, res, next) {
    try {
      // console.log(req.user);
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };

      const body = req.body;
      const newPostId = await this.postService.createPost(
        new CreatePostDTO({
          title: body.title,
          content: body.content,
          userId: req.user.id,
          tags: body.tags,
        })
      );

      res.status(201).json({ id: newPostId });
    } catch (err) {
      next(err);
    }
  }

  async createComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };

      const body = req.body;
      const newCommentId = await this.postService.createComment(
        new CreateCommentDTO({
          content: body.content,
          postId: body.postId,
          userId: req.user.id,
        })
      );

      res.status(201).json({ id: newCommentId });
    } catch (err) {
      next(err);
    }
  }

  async createChildComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };

      const body = req.body;
      const newChildCommentId = await this.postService.createChildComment(
        new CreateChildCommentDTO({
          content: body.content,
          parentCommentId: body.parentCommentId,
          userId: req.user.id,
        })
      );

      res.status(201).json({ id: newChildCommentId });
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해 주세요" };

      const { postId } = req.params;
      const body = req.body;

      await this.postService.updatePost(
        postId,
        new UpdatePostDTO(body),
        req.user
      );

      res.status(200).send("게시글이 수정되었습니다");
    } catch (err) {
      next(err);
    }
  }

  async updateComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해 주세요" };

      const { commentId } = req.params;
      const body = req.body;

      await this.postService.updateComment(
        commentId,
        new UpdateCommentDTO(body),
        req.user
      );

      res.status(200).json({ message: "댓글이 수정되었습니다" });
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };
      const { id } = req.params;

      await this.postService.deletePost(id, req.user);

      res.status(200).json({ message: "게시글이 삭제되었습니다" });
    } catch (err) {
      next(err);
    }
  }

  async deleteComment(req, res, next) {
    try {
      if (!req.user) throw { status: 401, message: "로그인을 진행해주세요" };
      const { id } = req.params;

      await this.PostService.deleteComment(id, req.user);

      res.status(200).json({ message: "댓글이 삭제되었습니다" });
    } catch (err) {
      next(err);
    }
  }
}

const postController = new PostController();

export default postController;
