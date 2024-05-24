'use client'

import { FC, forwardRef, LegacyRef } from "react";
import Input from "../UI/Input";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/app/store/user.selectors";
import { useModal } from "@/app/hooks/use-modal";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "@/app/helper/contsants.helper";
import { api } from "@/app/store/meta.api";

const ChangeEmailModal: FC = forwardRef((props, ref) => {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const { close } = useModal();
    const [changeEmailFn, { isLoading }] = api.useChangeEmailMutation();
    const [resendCodeFn] = api.useResendCodeMutation();
    const { register, handleSubmit, getValues, formState } = useForm<{ code: number, email: string }>();
    
    const resendCode = async () => {
        if(user?.email){
            await resendCodeFn({
                email: user?.email,
                type: 'validate-email'
            });
        }
    }

    const onSubmit = async() => {
        if(user?.email){
            const res = await changeEmailFn({
                payload: {
                    email: user?.email,
                    code: getValues('code'),
                    new_email: getValues('email')
                },
                token
            });
            if((res as any).data) {
                close()
            }
        }
    }
    return (
        <div className="py-2 ">
            <form
                ref={ref as LegacyRef<HTMLFormElement>}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className={`text-xl font-bold sm:text-xl mb-8 sm:leading-14`}>
                Change Email
                </h3>
                <div className="flex flex-col gap-4 pb-4">
                    <p className="text-white/50" >Please enter the verification code sent to {user?.email}</p>
                    <Input
                        autoFocus
                        type="text"
                        placeholder="Input verification code"
                        autoComplete="off"
                        className='rounded-md w-full'
                        {...register('code', { required: true })}
                    />
                    <p>Didn&apos;t receive the email? <span className="text-[#01A7F5] cursor-pointer" onClick={resendCode}>Click here to resend </span></p>
                    <p className="text-white/50">Set a new email address</p>
                    <Input
                        autoFocus
                        type="email"
                        placeholder="E-mail"
                        autoComplete="off"
                        className='rounded-md w-full'
                        {...register('email', { required: true, pattern: EMAIL_REGEX })}
                    />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <button className="border rounded-md p-2" onClick={() => close()}>CANCEL</button>
                    <input
                        type="submit"
                        disabled={!formState.isValid || isLoading}
                        value="CHANGE"
                        className={`border rounded-md p-2`}
                    />
                </div>
            </form>
        </div>
    )
});

ChangeEmailModal.displayName = "ChangeEmail";

export default ChangeEmailModal;