import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from '../api/login-api'
import { saveAuthSession } from '../services/auth-session'

export function useLoginApi() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      queryClient.removeQueries()
      saveAuthSession(session)
    },
  })
}
