import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Input } from '@/components/primitives'
import { useAuthStore } from '@/stores/authStore'

// Schema de validación
const signupSchema = z
  .object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Contraseña mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'Confirmar contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup, loading, error, clearError, user } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const onSubmit = async (data: SignupFormData) => {
    try {
      clearError()
      await signup(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      console.error('Signup error:', err)
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
          <p className="text-gray-600">Crear nueva cuenta</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200 text-sm">
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

          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>

        {/* Link to login */}
        <p className="text-center text-gray-600 text-sm mt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Inicia sesión
          </Link>
        </p>

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

export default SignupPage
