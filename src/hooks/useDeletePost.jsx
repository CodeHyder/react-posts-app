// hooks/useDeletePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/careers/";

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => axios.delete(`${API_URL}${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
