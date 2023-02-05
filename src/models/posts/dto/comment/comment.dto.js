import { UserDTO } from "../../../users/dto/users.dto";

export class CommentDTO {
  id;
  content;
  user;
  childComments;

  constructor(props) {
    this.id = props.id;
    this.content = props.content;
    this.user = new UserDTO(props.user);
    this.childComments = props.childComments?.map(
      (comment) => new CommentDTO(comment)
    );
  }
}
