import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { changePassword } from '../api/change-password-api'
import { CHANGE_PASSWORD_DEFAULT_VALUES } from '../constants/change-password'
import { changePasswordSchema } from '../schemas/change-password-schema'
import type {
  ChangePasswordError,
  ChangePasswordFormValues,
} from '../types/change-password'

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<ChangePasswordError>(error)) {
    return error.response?.data?.message || 'Không thể đổi mật khẩu. Vui lòng thử lại.'
  }

  return 'Không thể đổi mật khẩu. Vui lòng thử lại.'
}

export function useChangePasswordForm() {
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
    mode: 'onBlur',
  })
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => form.reset(CHANGE_PASSWORD_DEFAULT_VALUES),
  })

  const submit = form.handleSubmit((values) => {
    changePasswordMutation.mutate({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
  })

  return {
    control: form.control,
    isSubmitting: changePasswordMutation.isPending,
    submit,
    successOpen: changePasswordMutation.isSuccess,
    closeSuccess: changePasswordMutation.reset,
    errorMessage: changePasswordMutation.isError
      ? getErrorMessage(changePasswordMutation.error)
      : '',
    closeError: changePasswordMutation.reset,
  }
}
