import { S3Client } from '@aws-sdk/client-s3';
import { fromTemporaryCredentials } from '@aws-sdk/credential-providers';
import env from '../configs/env';

const THIRTY_MINUTES_S = 1800;

// Create an S3 service client with temporary credentials
const createS3Client = () => {
  const sourceCredentials = {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  };

  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: fromTemporaryCredentials({
      masterCredentials: sourceCredentials,
      params: {
        RoleArn: env.AWS_ROLE_ARN,
        RoleSessionName: 'PiccyEaterBackend',
        DurationSeconds: THIRTY_MINUTES_S,
      },
    }),
  });

  return s3Client;
};

export default createS3Client;
