import { FC, forwardRef, LegacyRef } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '@/app/hooks/use-modal';

import { ResendCodeType } from '@/app/interfaces/api.interfaces';
import { api } from '@/app/store/meta.api';

import Input from '../UI/Input';
import { ISigninProps } from './Signin';

export interface IVerifyEmailProps extends JSX.IntrinsicAttributes {
  email: string;
  type?: ResendCodeType;
}

const VerifyEmail: FC<IVerifyEmailProps> = forwardRef(({ email, type }, ref) => {
  const { open } = useModal();
  const [verifyCode, { isLoading }] = api.useVerifyCodeMutation();
  const { register, handleSubmit, getValues, formState } = useForm<{ code: number }>();

  const onSubmit = async () => {
    const result = await verifyCode({
      ...getValues(),
      email,
    });

    if ((result as any).data) open<ISigninProps>('signin', { email });
  };

  return (
    <>
      <h3 className="text-2xl font-bold sm:text-4xl text-white uppercase mb-6 text-center sm:leading-14">
        Verify Your Email
      </h3>
      <form
        ref={ref as LegacyRef<HTMLFormElement>}
        className="space-y-2 sm:space-y-4 flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          autoFocus
          placeholder="******"
          autoComplete="off"
          className="text-center tracking-[8px] rounded-3xl"
          {...register('code', { required: true, min: 100000, valueAsNumber: true })}
        />
        <input
          type="submit"
          disabled={!formState.isValid || isLoading}
          value="Verify"
          className={`bg-white font-semibold rounded-3xl w-full py-4 text-[#03161e] ease-in-out duration-300 hover:bg-[#051f2b] border-transparent border cursor-pointer hover:text-white hover:border hover:border-white`}
        />
      </form>
    </>
  );
});

VerifyEmail.displayName = "VerifyEmail";

export default VerifyEmail;