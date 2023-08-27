import client from "./client";

export interface Media {
  id: number;
  name: string;
  type: "image" | "video";
  placeholder: string;
  url: string;
}

export interface Memory {
  id: number;
  description: string;
  publishedAt: string;
  media: Media[] | null;
}

export type GetMemoriesResponse = { [key: string]: Memory[] };

export const getMemories: (
  getToken: () => Promise<string | null>
) => Promise<GetMemoriesResponse> = async (getToken) => {
  const token = await getToken();

  return client.get("/memories/api", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addMemory = async (
  getToken: () => Promise<string | null>,
  data: FormData
) => {
  const token = await getToken();
  console.log(client.getUri({ url: "/memories/api" }));

  return client.post("/memories/api", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "multipart/form-data",
    },
  });
};
