'use client'

import { useModal } from "@/app/hooks/use-modal";
import { api } from "@/app/store/meta.api";
import { selectUser } from "@/app/store/user.selectors";
import { FC, forwardRef } from "react";
import { useSelector } from "react-redux";

const VerificationCode: FC = forwardRef(({ }, ref) => {
    const user = useSelector(selectUser);
    const { open, close } = useModal();
    const [sendVerificationCode] = api.useResendCodeMutation();
    const verificationCode = async () => {
        if(user?.email){
            const result = await sendVerificationCode({
                email: user.email,
                type: 'validate-email'
            })
            if ((result as any).data) {
                open('change-email');
            }
        }
        
    }
    return (
        <>
            <div className="p-2">
                <h3 className={`text-xl font-bold sm:text-xl my-3 sm:leading-14`}>
                  Change Email
                </h3>
                <div className="pb-4 text-white/50">
                    <p>You will need a verification code to make this change.</p>
                    <p>Click the button below to receive an email containing your code.</p>
                </div>
                <hr/>
                <div className="flex justify-end gap-4 pt-4">
                    <button className="border p-2 rounded-md" onClick={()=> close()}>CANCEL</button>
                    <button className="border p-2 rounded-md" onClick={verificationCode}>SEND VERIFICATION</button>
                </div>

            </div>
        </>
    )
});

VerificationCode.displayName = "VerificationCode";

export default VerificationCode;