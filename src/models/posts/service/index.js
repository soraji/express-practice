import database from "../../../database";
import { UserService } from "../../users/service";
import { PostDTO, PostsDTO } from "../dto";

export class PostService {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  async getPosts({ skip, take }, searchValue) {
    const posts = await database.post.findMany({
      where: {
        title: {
          contains: searchValue ?? "",
        },
      },
      include: {
        user: true,
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    });
    const count = await database.post.count({
      where: {
        title: {
          contains: searchValue,
        },
      },
    });

    return { posts: posts.map((post) => new PostsDTO(post)), count };
  }

  async getPost(id) {
    console.log(id);
    const post = await database.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
            childComments: {
              include: {
                user: true,
              },
            },
          },
        },
        tag: true,
      },
    });
    console.log(post);
    if (!post) throw { status: 404, message: "게시물을 찾을 수 없습니다" };

    return new PostsDTO(post);
  }

  async createPostLike(userId, postId) {
    const user = await this.userService.findById(userId);

    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 303, message: "게시글을 찾을 수 없습니다" };

    const isLike = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (isLike) return;

    await database.postLike.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
      },
    });
  }

  async deletePostLike(userId, postId) {
    const user = await this.userService.findById(userId);

    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 303, message: "게시글을 찾을 수 없습니다" };

    const isLike = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (!isLike) return;

    await database.postLike.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });
  }

  async postLike(userId, postId, isLike) {
    const user = await this.userService.findById(userId);

    const post = await database.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw { status: 303, message: "게시글을 찾을 수 없습니다" };

    const isLiked = await database.postLike.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (isLike && !isLiked) {
      //좋아요 하는 경우
      await database.postLike.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      });
    } else if (!isLike && isLiked) {
      //좋아요 취소하는 경우
      await database.postLike.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId: post.id,
          },
        },
      });
    }
  }

  async createPost(props) {
    const newPost = await database.post.create({
      data: {
        title: props.title,
        content: props.content,
        user: {
          connect: {
            id: props.userId,
          },
        },
        tag: {
          createMany: {
            data: props.tags.map((tag) => ({ name: tag })),
          },
        },
      },
    });

    return newPost.id;
  }

  async createComment(props) {
    const user = await this.userService.findById(props.userId);

    const post = await database.post.findUnique({
      where: {
        id: props.postId,
      },
    });

    if (!post) throw { status: 404, message: "게시글을 찾을 수 없습니다" };

    const newComment = await database.comment.create({
      data: {
        content: props.connect,
        post: {
          connect: {
            id: post.id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return newComment.id;
  }

  async createChildComment(props) {
    const user = await this.userService.findById(props.userId);

    const parentComment = await database.comment.findUnique({
      where: {
        id: props.parentCommentId,
      },
    });

    if (!parentComment)
      throw { status: 404, message: "부모 댓글을 찾을 수 없습니다" };

    const newChildComment = await database.comment.create({
      data: {
        content: props.connect,
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: parentComment.id,
          },
        },
        parentComment: {
          connect: {
            id: parentComment.id,
          },
        },
      },
    });

    return newChildComment.id;
  }

  async updatePost() {}

  async updateComment() {}
}
