import { UserDTO } from "../../users/dto/users.dto";
import { TagDTO } from "./tag";
import { CommentDTO } from "../../posts/dto/comment/comment.dto";

export class PostDTO {
  id;
  title;
  content;
  createdAt;
  user;
  comments;
  tags;

  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
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
    this.tags = props.tags.map(
      (tag) =>
        new TagDTO({
          id: tag.id,
          name: tag.name,
        })
    );
  }
}
