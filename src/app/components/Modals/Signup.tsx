'use client'
import { FC, forwardRef, LegacyRef } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from "@/app/hooks/use-modal";
import Input from '../UI/Input';
import { ISigninProps } from './Signin';
import { RegisterRequest } from '@/app/interfaces/api.interfaces';
import { EMAIL_REGEX } from '@/app/helper/contsants.helper';
import { api } from '@/app/store/meta.api';
import { IVerifyEmailProps } from './VerifyEmail';

type FormType = RegisterRequest & {
    rePassword: string;
};

export interface ISignupProps extends JSX.IntrinsicAttributes {
    email?: string;
}

const Signup: FC<ISignupProps> = forwardRef(({ email }, ref) => {
    const { open } = useModal();
    const [signup, { isLoading }] = api.useRegisterMutation();
    const { register, handleSubmit, getValues, formState } = useForm<FormType>({
        defaultValues: {
          email,
          username: '',
          password: '',
          rePassword: '',
        },
    });

    const onSubmit = async () => {
    
        const { rePassword, ...values } = getValues();

        const result = await signup({
          ...values,
        });
    
        if ((result as any).data) open<IVerifyEmailProps>('verify-email', { email: values.email });
    };
    
    return (
        <>
            <h3 className={`text-xl font-bold sm:text-3xl text-white uppercase mb-6 text-center sm:leading-14`}>
                Create  an  account
            </h3>
            <form
                ref={ref as LegacyRef<HTMLFormElement>}
                className="space-y-2 sm:space-y-4 flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    autoFocus
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    className='rounded-3xl'
                    {...register('username', { required: true, minLength: 4 })}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    autoComplete="off"
                    className='rounded-3xl'
                    {...register('email', { required: true, pattern: EMAIL_REGEX })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    className='rounded-3xl'
                    {...register('password', { required: true, minLength: 6 })}
                />
                <Input
                    type="password"
                    placeholder="Re-Password"
                    className='rounded-3xl'
                    {...register('rePassword', {
                        required: true,
                        deps: ['password'],
                        validate(value, values) {
                          return value === values.password;
                        },
                    })}
                />
                <input
                    type="submit"
                    value="Create Account"
                    // disabled={!formState.isValid || isLoading}
                    className={`bg-white font-semibold rounded-3xl w-full py-4 text-[#03161e] ease-in-out duration-300 hover:bg-[#051f2b] border-transparent border cursor-pointer hover:text-white hover:border hover:border-white`}
                />
                <p className="text-center text-white">
                    Already have an account?{' '}
                    <a
                        href="#/"
                        className="text-brand-200 underline font-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            open<ISigninProps>('signin', { email: getValues('email') });
                        }}
                    >
                        Signin
                    </a>
                </p>
            </form>
        </>
    )
});

Signup.displayName = "Signup";
export default Signup;