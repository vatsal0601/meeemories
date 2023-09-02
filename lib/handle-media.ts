import { Blurhash } from "react-native-blurhash";
import isNil from "lodash/isNil";
import mime from "mime";

const generatePlaceholder = (uri: string) => {
  return Blurhash.encode(uri, 16, 16);
};

export const uploadMedia = async (uri: string) => {
  const mimeType = mime.getType(uri);
  if (isNil(mimeType)) return;
  const extension = mime.getExtension(mimeType);

  const placeholder = await generatePlaceholder(uri);

  console.log("Uploading to S3...", mimeType, extension, placeholder);
};
