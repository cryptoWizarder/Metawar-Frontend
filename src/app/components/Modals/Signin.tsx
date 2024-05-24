'use client'
import { FC, forwardRef, LegacyRef } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from "@/app/hooks/use-modal";
import Input from '../UI/Input';
import { EMAIL_REGEX } from '@/app/helper/contsants.helper';
import { ISignupProps } from './Signup';
import { LoginRequest, LoginResponse } from '@/app/interfaces/api.interfaces';
import { useMutation } from '@tanstack/react-query';
import { Arg, tRPCError } from '@/app/helper/api/trpc.interfaces';
import { trpc, displayError } from '@/app/helper/api/api.helper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/app/store';
import { setToken, setUser } from '@/app/store/user.reducer';


export interface ISigninProps extends JSX.IntrinsicAttributes {
    email?: string;
}

const api = trpc.auth.login.mutate<LoginResponse>;
type Argument = Arg<typeof api>;
type FormInputs = Argument;

const schema = yup
  .object({
    email: yup.string().email().required('Please provide a valid first name'),
    password: yup.string().required('Please provide a valid password'),
  })
  .required();

const Signin: FC<ISigninProps> = forwardRef(({ email }, ref) => {
    const { open, close } = useModal();
    const dispatch = useAppDispatch();
    const { mutate: signin, } = useMutation({
        mutationFn: (data: FormInputs) => {
            console.log(data);
          return api(data);
        },
        onSuccess: ({ token, ...data }) => {
        //   dispatch(setUser(data));
          dispatch(setToken(token));
        //   router.replace('/');
        },
        onError(err: tRPCError) {
            console.log(err)
          displayError(err);
        },
    });
    const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<FormInputs>({
        resolver: yupResolver(schema),
    });


    // const login = useMutation({
    //     mutationFn: async (data: { email: string, password: string }) => await trpc.mutation('auth.login', data),
    //     onSuccess: (data: any) => {
    //         localStorage.setItem('token', (data as { token: string }).token);
    //         close();
    //         // go to next step here -> show dialog with code input for 6 characters
    //     },
    //     onError: (_error: any) => {
    //         // show error message in toast
    //     },
    // });

    // const onSubmit = async (data: { email: string, password: string }) => {
    //     // make sure to remove previous token
    //     localStorage.removeItem('token');
    //     login.mutate(data);
    // };

    return (
        <>
            <h3 className="text-2xl font-bold sm:text-4xl text-white uppercase mb-6 text-center sm:leading-14">
                Login to your account
            </h3>
            <form
                ref={ref as LegacyRef<HTMLFormElement>}
                className="space-y-2 sm:space-y-4 flex flex-col gap-2"
                onSubmit={handleSubmit((data) => {
                    signin(data)
                })}
            >
                <Input
                    autoFocus
                    type="email"
                    placeholder="E-mail"
                    autoComplete="off"
                    className='rounded-3xl'
                    {...register('email', { required: true })}
                    // errorMessage={errors.email?.message}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    className='rounded-3xl'
                    {...register('password', { required: true, minLength: 6 })}
                />
                <div className="flex text-brand-200 underline font-semibold gap-10 justify-center">
                    <button
                        type="button"
                    // onClick={() =>
                    // open<IRequestCodeProps>('request-code', {
                    //     email: getValues('email'),
                    //     type: 'forgot-password',
                    // })
                    // }
                    >
                        Forgot Password?
                    </button>
                    <button
                        type="button"
                        onClick={() => open<ISignupProps>('signup', { email: getValues('email') })}
                    >
                        Create an account
                    </button>
                </div>
                <button
                    // disabled = {isLoading}
                    className={`bg-white font-semibold rounded-3xl w-full py-4 text-[#03161e] ease-in-out duration-300 hover:bg-[#051f2b] border-transparent border cursor-pointer hover:text-white hover:border hover:border-white`}
                >Login</button>
            </form>
        </>
    )
});

Signin.displayName = "Signin";
export default Signin;