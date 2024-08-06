export const handler = async (event) => {
  // TODO implement
  const code = event.headers.authorization;
  let response = {
    principalId: "abcdef", // The principal user identification associated with the token sent by the client.
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Deny",
          Resource: event.methodArn,
        },
      ],
    },
    context: {
      exampleKey: "exampleValue",
    },
  };

  if (code === "10022002") {
    response = {
      principalId: "abcdef", // The principal user identification associated with the token sent by the client.
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: event.methodArn,
          },
        ],
      },
      context: {
        exampleKey: "exampleValue",
      },
    };
  }

  return response;
};
