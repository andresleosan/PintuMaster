import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@/components/primitives'
import { useAuthStore } from '@/stores/authStore'

// Schema de validación
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Contraseña mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError, user } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError()
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold">PM</span>
          </div>
          <h1 className="text-3xl font-bold text-dark mb-2">PintuMaster</h1>
          <p className="text-gray-600">Gestión de latonería y pintura automotriz</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="correo@ejemplo.com"
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <span className="text-gray-700">Recuérdame</span>
            </label>
            <a href="#" className="text-primary hover:underline font-semibold">
              ¿Olvidó contraseña?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-4">
          ¿Necesita ayuda? Contacte a{' '}
          <a href="mailto:soporte@pintumaster.com" className="text-primary hover:underline font-semibold">
            soporte@pintumaster.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
