import axios from 'axios';

export interface ResponseTags {
  id: number;
  name: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    links: number;
  };
}

// The Linkwarden Tags API returns a different shape than Collections:
//   GET /api/v1/tags → { data: { tags: [...], nextCursor }, success, message }
// We normalize here to { data: { response: [...] } } for consistency with
// getCollections, so consumers can access .data.response uniformly.
interface GetTagsApiResponse {
  data: {
    tags: ResponseTags[];
    nextCursor: number | null;
  };
  success: boolean;
  message: string;
}

export async function getTags(baseUrl: string, apiKey: string) {
  const url = `${baseUrl}/api/v1/tags`;
  const res = await axios.get<GetTagsApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return {
    data: {
      response: res.data.data.tags,
    },
  };
}
