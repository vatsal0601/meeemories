import { Blurhash } from "react-native-blurhash";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import isNil from "lodash/isNil";
import mime from "mime";

const createPresignedPutURL = ({
  key,
  contentType,
}: {
  key: string;
  contentType: string;
}) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION!,
  });
  // Expires in 15 minutes.
  const expiresIn = 15 * 60;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });
  return getSignedUrl(client, command, { expiresIn });
};

const createPresignedGetURL = (key: string) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION!,
  });

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
  });
  return getSignedUrl(client, command);
};

const generatePlaceholder = (uri: string) => {
  return Blurhash.encode(uri, 16, 16);
};

export const uploadMedia = async (userId: string, uri: string) => {
  const mimeType = mime.getType(uri);
  if (isNil(mimeType)) return;
  const extension = mime.getExtension(mimeType);

  const res = await fetch(uri);
  const blob = await res.blob();

  const placeholder = await generatePlaceholder(uri);

  console.log("Uploading to S3...", mimeType, extension, placeholder);
};
