import { UserDTO } from "../../users/dto/users.dto";
import { TagDTO } from "./tag";
import { CommentDTO } from "../../posts/dto/comment/comment.dto";

export class PostDTO {
  id;
  title;
  content;
  createdAt;
  likeCount;
  isLiked;
  user;
  comments;
  tags;

  constructor(props, user) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.likeCount = props.postLike.length;
    this.isLiked = user
      ? !!props.postLike.find((like) => like.userId === user.id)
      : false;
    this.user = new UserDTO(props.user);
    this.comments = props.comments.map(
      (comment) =>
        new CommentDTO({
          id: comment.id,
          comment: comment.comment,
          childComments: comment.childComments,
          user: comment.user,
        })
    );
    this.tags = props.tag.map(
      (tag) =>
        new TagDTO({
          id: tag.id,
          name: tag.name,
        })
    );
  }
}
