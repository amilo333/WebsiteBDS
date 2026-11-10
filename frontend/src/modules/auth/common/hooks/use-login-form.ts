import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { LOGIN_DEFAULT_VALUES } from '../constants/login'
import { loginSchema } from '../schemas/login-schema'
import type {
  AuthApiError,
  LoginRequest,
  UseLoginFormOptions,
} from '../types/auth'
import { useLoginApi } from './use-login-api'

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError<AuthApiError>(error)) {
    return error.response?.data?.message || 'Đăng nhập không thành công'
  }

  return 'Đăng nhập không thành công'
}

export function useLoginForm({
  onSuccess,
  redirectTo = '/doi-mat-khau',
}: UseLoginFormOptions = {}) {
  const navigate = useNavigate()
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: LOGIN_DEFAULT_VALUES,
    mode: 'onBlur',
  })
  const loginMutation = useLoginApi()

  const submit = form.handleSubmit((values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        onSuccess?.()

        if (redirectTo) {
          navigate(redirectTo, { replace: true })
        }
      },
    })
  })

  return {
    control: form.control,
    submit,
    isSubmitting: loginMutation.isPending,
    errorMessage: loginMutation.isError
      ? getErrorMessage(loginMutation.error)
      : '',
    closeError: loginMutation.reset,
  }
}
