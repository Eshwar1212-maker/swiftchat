'use client';
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form'
import { useState, useCallback, useEffect } from "react";
import Button from '@/app/components/Button';
import { BsGithub } from 'react-icons/bs'
import { BsGoogle } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast'
import AuthSocialButton from './AuthSocialButton';
import { signIn, useSession } from 'next-auth/react'
import Input from '@/app/components/inputs/Input';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            console.log('authenticated');
            router.push('/users')

        }
    }, [session?.status])


    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error("Invalid credentials")
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success("Logged in!")
                        router.push('/users')

                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
    const socialAction = (action: string) => {
        setIsLoading(true)
        signIn(action, {
            redirect: false,
        })
            .then((callback) => {
                if (callback?.error) {
                    toast.error("Invalid Credentials")
                }
                if (callback?.ok && !callback?.error) {
                    toast.success("Logged in!")
                }
            })
            .finally(() => {
                setIsLoading(false)
            })

    }
    return (
        <div className="
        mt-8 sm:mx-auto sm:w-full sm:max-w-md 
        ">
            <div className='
            px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10
            '
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-6 
                '
                >
                    {
                        variant === 'REGISTER' && (
                            <Input
                                id="name"
                                label="Name"
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                            />
                        )
                    }
                    <Input
                        id="email"
                        label="Email address"
                        type='email'
                        register={register}
                        errors={errors}
                        disabled={isLoading}

                    />
                    <Input
                        id="password"
                        label="Password"
                        type='password'
                        register={register}
                        errors={errors}
                        disabled={isLoading}

                    />
                    <div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'
                            />

                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-500'>
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton onClick={() => socialAction('github')} icon={BsGithub} />
                        <AuthSocialButton onClick={() => socialAction('google')} icon={BsGoogle} />
                    </div>
                </div>
                <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                    <div>
                        {variant === 'LOGIN' ? 'New to SwiftChat?' : 'Already have an account?'}

                    </div>
                    <div
                        onClick={toggleVariant}
                        className='underline cursor-pointer'
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Sign in'}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthForm 