'use client'
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectToken } from '../store/user.selectors';
import { api } from '../store/meta.api';

export default function Left() {
    
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
        <div className='flex flex-col px-6 py-4 bg-teal-950/30 h-[15rem]'>
            <hr/>
            <Link 
                className="w-full text-[18px] my-2 hover:text-[#01A7F5]"
                href={'/profile/account'}
            >
                My Account
            </Link>
            <hr/>
            <Link 
                className="w-full text-[18px] my-2 hover:text-[#01A7F5]"
                href={'/profile/password'}
            >
                Password & Security
            </Link>
            <hr/>
            <Link 
                className="w-full text-[18px] my-2 hover:text-[#01A7F5]"
                href={'/profile/wallet'}
            >
                Linked Wallets
            </Link>
            <hr/>
            <Link 
                className="w-full text-[18px] my-2 hover:text-[#01A7F5]"
                href={'/'}
                onClick={handleLogout}
            >
                Sign out
            </Link>
            <hr/>
        </div>
    )
}