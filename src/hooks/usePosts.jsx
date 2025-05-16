import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/careers/";

const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export function usePosts() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const createPost = useMutation({
    mutationFn: ({ username, title, content }) =>
      axios.post(API_URL, { username, title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    posts: data,
    isLoading,
    error,
    createPost,
  };
}
