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
  },
};
