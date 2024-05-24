'use client'
import { FaInstagram, FaTwitter, FaTelegramPlane  } from "react-icons/fa";

import localFont from "next/font/local";
const blanlgothic = localFont({ src: "../../bankgothic-regular.ttf" });

export default function Footer() {
    return (
        <footer className="text-center bg-[url(/BG-04.png)] bg-cover bg-center">
            <div className="flex flex-col items-center justify-center max-lg:py-44 h-[50rem] lg:h-screen relative">
                <div className="bottom-28 absolute ">
                    <div className="flex flex-col justify-center items-center">
                        <a href="/">
                            <img src="/MetaWar.svg" alt="MetaWar Logo" className="w-[270px] lg:w-[394px]" />
                        </a>
                        <p className={`text-[30px] lg:text-[42px] tracking-widest ${blanlgothic.className}`}>SUPERCHAGED</p>
                        <p className={`text-[15px] lg:text-[19px] tracking-widest ${blanlgothic.className}`}><span className="text-[#FFE500]">REDEFINING THE</span> FUTURE <span className="text-[#FFE500]">OF GAMING</span> </p>
                    </div>
                    <div className="flex items-center justify-center my-10 space-x-3 lg:space-x-12  ">
                        <a href="https://x.com/metawargame" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"><FaTwitter /> Twitter</a>
                        {/* <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"><FaInstagram /> Dextools</a> */}
                        <a href="https://t.me/MetawarGame" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2"><FaTelegramPlane /> Telegram</a>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center underline gap-4 lg:gap-16">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact Us
                        </a>
                        <a href="#" rel="noopener noreferrer">
                            Privacy Policy
                        </a>
                        <a href="#" rel="noopener noreferrer">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}