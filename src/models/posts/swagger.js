import { response } from "express";

export const getPost = {
  "/posts/:id": {
    get: {
      tags: ["Post"],
      summary: "게시글 상세 조회",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  post: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      title: {
                        type: "string",
                      },
                      content: {
                        type: "string",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                      },
                      likeCount: {
                        type: "string",
                      },
                      isLiked: {
                        type: "boolean",
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          age: {
                            type: "number",
                          },
                          email: {
                            type: "string",
                          },
                          phoneNumber: {
                            type: "string",
                          },
                        },
                      },
                      comments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            content: {
                              type: "string",
                            },
                            user: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                                age: {
                                  type: "number",
                                },
                                email: {
                                  type: "string",
                                },
                                phoneNumber: {
                                  type: "string",
                                },
                              },
                            },
                            childComments: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: [
                                  {
                                    id: {
                                      type: "string",
                                    },
                                    title: {
                                      type: "string",
                                    },
                                    content: {
                                      type: "string",
                                    },
                                    createdAt: {
                                      type: "string",
                                      format: "date-time",
                                    },
                                    likeCount: {
                                      type: "string",
                                    },
                                    isLiked: {
                                      type: "boolean",
                                    },
                                    user: {
                                      type: "object",
                                      properties: {
                                        id: {
                                          type: "string",
                                        },
                                        name: {
                                          type: "string",
                                        },
                                        age: {
                                          type: "number",
                                        },
                                        email: {
                                          type: "string",
                                        },
                                        phoneNumber: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getPosts = {};

export const postLike = {
  "/posts/:postId/like-combined": {
    delete: {
      tags: ["Post"],
      summary: "게시글 좋아요 혹은 좋아요 삭제",
      parameters: [
        {
          in: "path",
          name: "postId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                isLike: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export const createPostSwagger = {
  "/posts": {
    post: {
      tags: ["Post"],
      summary: "게시물 생성",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const createCommentSwagger = {
  "/posts/comment": {
    post: {
      tags: ["Post"],
      summary: "댓글 생성",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
                postId: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const createChildCommentSwagger = {
  "/posts/child-comment": {
    post: {
      tags: ["Post"],
      summary: "대댓글 생성",
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
                parentCommentId: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const updatePostSwagger = {
  "/posts/:postId": {
    patch: {
      tags: ["Post"],
      summary: "게시글 수정",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "postId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export const updateCommentSwagger = {
  "/comments/:commentId": {
    patch: {
      tags: ["Post"],
      summary: "댓글 수정하기",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "commentId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export const deletePostSwagger = {
  "/posts/:postId": {
    delete: {
      tags: ["Post"],
      summary: "게시글 삭제",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "postId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};

export const deleteCommentSwagger = {
  "/comments/:commentId": {
    delete: {
      tags: ["Post"],
      summary: "댓글 삭제하기",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "path",
          name: "commentId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {},
              },
            },
          },
        },
      },
    },
  },
};
