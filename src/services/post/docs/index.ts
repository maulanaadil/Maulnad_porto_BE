module.exports = {
  "/posts": {
    get: {
      tags: ["Posts"],
      description: "Get all posts",
      operationId: "getPosts",
      consumes: ["application/json"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [],
      responses: {
        "200": {
          description: "Success Response",
          content: {
            "application/json": {
              example: {
                code: 200,
                status: "success",
                message: "Get all posts success!",
                data: [],
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Posts"],
      description: "Create new post",
      operationId: "createPost",
      consumes: ["multipart/form-data"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Post title",
                },
                description: {
                  type: "string",
                  description: "Post description",
                },
                published: {
                  type: "boolean",
                  description: "Post published status",
                },
                authorId: {
                  type: "number",
                  description: "Post author id",
                },
                linkTo: {
                  type: "string",
                  description: "Post link to",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Post image",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Success Response",
          content: {
            "application/json": {
              example: {
                code: 201,
                status: "success",
                message: "Create post success!",
                data: {},
              },
            },
          },
        },
      },
    },
  },
  "/posts/{id}": {
    get: {
      tags: ["Posts"],
      description: "Get post by id",
      operationId: "getPostById",
      consumes: ["application/json"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "id of your post",
          required: true,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        "200": {
          description: "Success Response",
          content: {
            "application/json": {
              example: {
                code: 200,
                status: "success",
                message: "Get all posts success!",
                data: [],
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Posts"],
      description: "Update existing post",
      operationId: "updatePost",
      consumes: ["multipart/form-data"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "id of your post",
          required: true,
          type: "string",
          example: "1",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Post title",
                },
                description: {
                  type: "string",
                  description: "Post description",
                },
                published: {
                  type: "boolean",
                  description: "Post published status",
                },
                linkTo: {
                  type: "string",
                  description: "Post link to",
                },
                image: {
                  type: "string",
                  format: "binary",
                  description: "Post image",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Success Response",
          content: {
            "application/json": {
              example: {
                code: 201,
                status: "success",
                message: "Update post success!",
                data: {},
              },
            },
          },
        },
        "404": {
          description: "Invalid ID post supplied/ID post is not found",
          content: {
            "application/json": {
              example: {
                code: 404,
                status: "failed",
                message: "Invalid ID post supplied/ID post is not found",
                data: null,
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Posts"],
      description: "Delete post",
      operationId: "deletePost",
      consumes: ["multipart/form-data"],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "id of your post",
          required: true,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        "201": {
          description: "Success Response",
          content: {
            "application/json": {
              example: {
                code: 201,
                status: "success",
                message: "Delete post success!",
                data: null,
              },
            },
          },
        },
        "404": {
          description: "Invalid ID post supplied/ID post is not found",
          content: {
            "application/json": {
              example: {
                code: 404,
                status: "failed",
                message: "Invalid ID post supplied/ID post is not found",
                data: null,
              },
            },
          },
        },
      },
    },
  },
};
