'use client'
import { useRef, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiMenuFries } from "react-icons/ci";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useModal } from "@/app/hooks/use-modal";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@/app/store/user.selectors";
import { api } from "@/app/store/meta.api";
import Image from "next/image";
import Link from "next/link";

export default function NavButton() {
  const { open } = useModal();
  const ref = useRef(null)
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [isOpen, setIsOpen] = useState(false);
  
  const [logout] = api.useLogoutMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((state: boolean) => !state);
  }

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

  return (
    <div className="lg:hidden">
      <div className="flex">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 flex items-center justify-center"
        >
          {isOpen ? <RxCross2 className="h-8 w-8" /> : <CiMenuFries className="h-8 w-8" />}
        </button>
        {
          user ?
            <button className="" onClick={() => toggleDropdown()}>
                <Image src="/icons/profile_page.svg" alt="Profile Icon" className="rounded-[50%]" width={40} height={40} />
            </button>
            :
            <></>
        }
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -400 }}
            animate={{ y: 0 }}
            exit={{ y: -400 }}
            className="flex flex-col flex-1 justify-between items-center py-10 fixed inset-x-4 top-16 bg-teal-950/80 shadow-xl z-[200] mt-10"
          >
            <ul className="flex flex-col items-center space-y-10 mb-10">
              <li>
                <a href="#game">Game</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#modes">Modes</a>
              </li>
              <li>
                <a href="#gameplay">Gameplay</a>
              </li>
              {
                !user ?
                  <li>
                    <button
                        type="button"
                        onClick={() => open('signin')}
                    >Login</button>
                  </li>
                  :
                  <></>
              }
            </ul>
          </motion.div>
        )}
        {
          isDropdownOpen &&
          <div className="absolute w-[260px] bg-[#021622] px-6 py-4 rounded-[10px] right-0" ref={ref}>
              <div className="w-full flex justify-center items-center space-x-4 px-1 pb-4 border-b border-[#6F6E6E] mb-4">
                  <Image src="/icons/profile_page.svg" alt="Profile Icon" className="rounded-[50%]" width={40} height={40} />
                  <span className="text-[18px]">{user?.username || 'User'}</span>
              </div>
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
      </AnimatePresence>
    </div>
  );
}
