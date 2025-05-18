import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

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
    onError: (error) => {
      console.error("Erro ao criar post:", error);
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, title, content }) => {
      return axios.patch(`${API_URL}${id}/`, { title, content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar post:", error);
    },
  });

  const deletePost = useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  })

  return {
    posts: data,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost,
  };
}
