'use client'
import Input from "@/app/components/UI/Input";
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { selectToken, selectUser } from "@/app/store/user.selectors";
import { api } from "@/app/store/meta.api";
import Top from "../Top";
import Left from "../Left";

export default function Password() {
    const user = useSelector(selectUser);
    const token = useSelector(selectToken);
    const [changePassword, { isLoading }] = api.useChangePasswordMutation();
    const { register, handleSubmit, getValues, formState } = useForm<{
        old_password: string;
        new_password: string;
        re_password: string;
    }>();

    const onSubmit = async () => {
        const { old_password, new_password } = getValues();
        const result = await changePassword({
          token,
          payload: { old_password, new_password },
        });
    
        if ((result as any).data) close();
      };
    return (
        <>
            <Top />
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <main className="absolute top-[8rem] lg:top-1/4 w-full ">
                    <div className="flex w-3/4 justify-between mx-auto">
                        <div className="hidden lg:flex">
                            <Left />
                        </div>
                        <div className="flex flex-col w-full lg:w-4/5 bg-teal-950/30 rounded-md">
                            <p className="p-5">
                                Change Password
                            </p>
                            <hr />
                            <div className="p-5 space-y-8">
                                <div className="flex flex-col lg:flex-row w-full mb-5 lg:my-2">
                                    <label className="flex justify-start lg:justify-end mt-[0.7rem] w-auto lg:w-1/3 px-3">Current password</label>
                                    <div className="flex flex-col px-2 w-auto lg:w-[25rem]">
                                        <Input
                                            autoFocus
                                            type="password"
                                            placeholder="Your current password"
                                            autoComplete="off"
                                            className="rounded-md py-3 w-full"
                                            {...register('old_password', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row w-full mb-0 lg:mb-5 lg:my-2">
                                    <label className="flex justify-start lg:justify-end mt-[0.7rem] w-auto lg:w-1/3 px-3">New password</label>
                                    <div className="flex flex-col px-2 w-auto lg:w-[25rem]">
                                        <Input
                                            autoFocus
                                            type="password"
                                            placeholder="new password"
                                            autoComplete="off"
                                            className="rounded-md py-3 w-full"
                                            {...register('new_password', { required: true, minLength: 6 })}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row w-full mb-5 lg:my-2">
                                    <label className="flex justify-end mt-[0.7rem] w-1/3 px-3"></label>
                                    <div className="px-2">
                                        <ul>
                                            <li><span className="text-[13px]">Your password must contain between 8 to 32 characters.</span></li>
                                            <li><span className="text-[13px]">Contain at least 3 of the following 4 types of characters: uppercase letters, lowercase letters, numbers, special characters.</span></li>
                                            <li><span className="text-[13px]">Cannot contain 3 of the same characters in a row.</span></li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="flex flex-col lg:flex-row w-full mb-5 lg:my-2">
                                    <label className="flex justify-start lg:justify-end mt-[0.7rem] w-auto lg:w-1/3 px-3">Confirm new password</label>
                                    <div className="flex flex-col px-2 w-auto lg:w-[25rem]">
                                        <Input
                                            autoFocus
                                            type="password"
                                            placeholder="confirm new password"
                                            autoComplete="off"
                                            className="rounded-md py-3 w-full"
                                            {...register('re_password', {
                                                required: true,
                                                deps: ['password'],
                                                validate(value, values) {
                                                return value === values.new_password;
                                                },
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="p-5 flex justify-end">
                                <input
                                    type="submit"
                                    disabled={!formState.isValid || isLoading}
                                    value="Change password"
                                    className="p-3 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </form>
        </>
    )
}