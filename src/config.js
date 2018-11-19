export default {
    MAX_ATTACHMENT_SIZE: 5000000,

    s3: {
      REGION: "us-east-1",
      BUCKET: "notes-app-2-api-dev-serverlessdeploymentbucket-1r702sf20o5yr"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://cnpryzeug8.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_i0l09Zhsb",
      APP_CLIENT_ID: "4ob9b4im6hfsuvqpa7jn0gj4m8",
      IDENTITY_POOL_ID: "us-east-1:abba4eb5-250f-4a94-ab33-1fd2bc266358"
    }
    
  };