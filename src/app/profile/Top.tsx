'use client'
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/user.selectors';
import { api } from '../store/meta.api';

export default function Top() {
    
    const ref = useRef(null)
    const token = useSelector(selectToken);
    const [logout] = api.useLogoutMutation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    const handleLogout = async() => {
        await logout({
            token
        });
    }

    useEffect(() => {
        const handleOutSideClick = (event: { target: any; }) => {
            const currentEle = ref.current as any
            if (!currentEle) {
                return
            }
            if (!currentEle.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref])

    return(
        <header className="flex items-center py-7 fixed top-0 inset-x-0 z-50 bg-teal-950/30">
            <nav className="flex items-center justify-between container ml-auto px-5">
                <a href="/">
                    <img src="/MetaWar.svg" alt="MetaWar Logo" />
                </a>
                <div className='relative'>
                            <button className="" onClick={() => toggleDropdown()}>
                                <Image src="/icons/profile_page.svg" alt="Profile Icon" className="rounded-[50%]" width={40} height={40} />
                            </button>

                            {
                                isDropdownOpen &&
                                <div className="absolute w-[260px] bg-[#021622] px-6 py-4 rounded-[10px] right-0" ref={ref}>
                                    <div className='flex flex-col'>
                                        <Link 
                                            className="w-full text-[18px] px mb-4 hover:text-[#01A7F5]"
                                            href={'/profile/account'}
                                        >
                                            My Account
                                        </Link>
                                        <Link 
                                            className="w-full text-[18px] px mb-4 hover:text-[#01A7F5]"
                                            href={'/profile/password'}
                                        >
                                            Password & Security
                                        </Link>
                                        <Link 
                                            className="w-full text-[18px] px mb-4 hover:text-[#01A7F5]"
                                            href={'/profile/wallet'}
                                        >
                                            Linked Wallets
                                        </Link>
                                        <Link 
                                            className="w-full text-[18px] hover:text-[#01A7F5]"
                                            href={'/'}
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                </div>
                            }

                        </div>
            </nav>
        </header>
    )
}