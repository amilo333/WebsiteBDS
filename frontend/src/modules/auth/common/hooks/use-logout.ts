import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../../api/logout-api'
import { clearAuthSession } from '../services/auth-session'

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuthSession()
      queryClient.clear()
    },
  })
}
