'use client'
import { useState, useEffect } from "react";
import Input from "@/app/components/UI/Input";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { selectToken, selectUser } from "@/app/store/user.selectors";
import { useModal } from "@/app/hooks/use-modal";
import Top from "../Top";
import Left from "../Left";
import { api } from "@/app/store/meta.api";

export default function Account() {
    const user = useSelector(selectUser);
    const [ changeBirthdayFn ] = api.useChangeBirthdayMutation();
    const token = useSelector(selectToken);
    const { open } = useModal();

    const [year, setYear] = useState(user ? new Date(user.birthday) : new Date());
    const [month, setMonth] = useState(
        user ? new Date(user.birthday) : new Date()
    );
    const [day, setDay] = useState(user ? new Date(user.birthday) : new Date());
    const minDate = new Date(year.getFullYear(), month.getMonth(), 1);
    const maxDate = new Date(year.getFullYear(), month.getMonth() + 1, 0);

    useEffect(() => {
        if(user?.birthday){
            const birthday = new Date(user.birthday);
            setDay(new Date(year.getFullYear(), month.getMonth(), birthday.getDate()));
        }else {
            setDay(new Date(year.getFullYear(), month.getMonth(), 1));
        }
    }, [month, year, setDay]);

    useEffect(() => {
        setDay(new Date(year.getFullYear(), month.getMonth(), day.getDate()));
    }, []);

    useEffect(() => {
        if(user?.birthday){
            const birthday = new Date(user.birthday)
            setYear(birthday);
            setMonth(birthday);
            setDay(birthday);
        }
    }, [user]);

    const renderDayContents = (day: any, date: any) => {
        if (date < minDate || date > maxDate) {
          return <span></span>;
        }
        return <span>{date.getDate()}</span>;
    };
    
    const changeBirthday = async () => {
        const birthday = new Date(year.getFullYear(), month.getMonth(), day.getDate());
        await changeBirthdayFn({
            payload: { birthday }, 
            token
        })
    }

    return(
        <>
            <Top/>
            <main className=" absolute top-[8rem] lg:top-1/4 w-full">
                <div className="flex w-3/4 justify-between mx-auto">
                    <div className="hidden lg:flex">
                        <Left/>
                    </div>
                    <div className="flex flex-col mx-auto bg-teal-950/30 w-full lg:w-4/5 rounded-md">
                        <p className="p-5">
                            My Account
                        </p>
                        <hr/>
                        <div className="p-5">
                            <div className="flex flex-col lg:flex-row w-full mb-5 lg:my-2">
                                <label className="flex justify-start lg:justify-end mt-[0.7rem] w-auto lg:w-1/3 px-3">Username</label>
                                <div className="flex flex-col px-2 max-w-sm">
                                    <Input
                                        autoFocus
                                        type="text"
                                        placeholder="CR"
                                        autoComplete="off"
                                        className="rounded-md py-3 "
                                        disabled
                                        value={user?.username}
                                    />
                                    <span className="text-[11px]">A-Z, 0-1 and select Special Characters - _ . Spaces are not allowed. Start and end with alphanumeric</span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row w-full my-2">
                                <label className="flex justify-start lg:justify-end items-center w-auto lg:w-1/3 px-3">Email</label>
                                <div className="flex px-2 gap-4 max-w-sm">
                                    <span>{user?.email}</span>
                                    <span className="text-[#01A7F5] cursor-pointer" onClick={() => open('verify-code')}>Change</span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row w-full my-2">
                                <label className="flex justify-start lg:justify-end items-center w-auto lg:w-1/3 px-3">Date of birth</label>
                                <div className="flex px-2 gap-2">
                                    <DatePicker
                                        selected={month}
                                        showMonthYearPicker
                                        dateFormat="MM"
                                        onChange={(date: any) => setMonth(date)}
                                        className="bg-black/30 py-4 px-2 rounded-md w-[5rem] lg:w-[8rem] focus:outline-none"
                                    />
                                    <DatePicker
                                        dateFormat="dd"
                                        selected={day}
                                        renderDayContents={renderDayContents}
                                        onChange={(date: any) => setDay(date)}
                                        className="bg-black/30 py-4 px-2 rounded-md w-[5rem] focus:outline-none"
                                    />
                                    <DatePicker
                                        selected={year}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        onChange={(date: any) => setYear(date)}
                                        className="bg-black/30 py-4 px-2 rounded-md w-[5rem] focus:outline-none "
                                    />
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="p-5 flex justify-end">
                            <button className="p-3 border rounded-md" onClick={changeBirthday}>Save Change</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}