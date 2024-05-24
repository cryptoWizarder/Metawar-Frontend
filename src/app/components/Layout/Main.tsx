'use client'
import localFont from "next/font/local";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
const blanlgothic = localFont({ src: "../../bankgothic-regular.ttf" });

const abnes = localFont({ src: "../../abnes.ttf" });

export default function Main() {
    return (
        <main>
          <section
            className="relative bg-[url(/hero_new.png)] bg-cover max-lg:bg-center lg:bg-fixed"
            id="game"
          >
            <div className="container mx-auto px-10 max-lg:py-44 lg:h-screen relative">
              <div className="lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2">
                <h1 className={`${blanlgothic.className}`}>
                  <span className="tracking-[0.3em] block mb-4 text-xl">
                    Welcome to
                  </span>
                  <img
                    src="/hero_text.svg"
                    alt="MetaWar Logo"
                    className="w-4/5 lg:w-screen lg:max-w-2xl"
                  />
                </h1>
                <p
                  className={`mt-8 max-lg:text-sm lg:w-screen max-w-2xl lg:tracking-wide ${blanlgothic.className}`}
                >
                  Dive into the world of MetaWar, an innovative AAA shooter game
                  that’s set to push the boundaries of traditional gaming. MetaWar
                  offers intense gameplay, cutting-edge technology, and blockchain
                  integration to deliver an unparalleled gaming experience.
                </p>
                {/* <div className="flex flex-col lg:flex-row justify-between">
                  <Link
                    href="/"
                    className="px-12 py-6 mt-4 inline-block relative -z-0 text-black"
                  >
                    <span className={`z-10 relative ${blanlgothic.className}`}>
                      BUY NOW
                    </span>
                    <svg
                        className="w-full h-full absolute inset-0"
                        viewBox="0 0 242 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                          stroke="none"
                          fill="#FFE600"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          stroke="none"
                          d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                          fill="#FFE600"
                        />
                    </svg>
                  </Link>
                  <Link
                    href="/"
                    className="px-12 py-6 mt-4 inline-block relative -z-0 text-black"
                  >
                    <span className={`z-10 relative ${blanlgothic.className}`}>
                      LEARN MORE
                    </span>
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 242 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                        fill="#FFFFFF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </Link>
                </div> */}
              </div>
            </div>
          </section>
          <section
            className="relative bg-[url(/BG-01.png)] bg-cover max-lg:bg-center lg:bg-fixed"
            id="about"
          >
            <div className="container mx-auto px-10 max-lg:py-44 lg:h-screen relative">
              <div className="lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2">
                <h3 className={`${abnes.className} text-3xl lg:text-7xl`}>
                  <span className="block">intense</span>
                  <span className="block text-[#FFE600]">battles</span>
                </h3>
                <p
                  className={`mt-8 lg:w-screen max-w-2xl tracking-wide ${blanlgothic.className}`}
                >
                  Embark on thrilling battles, own in-game assets, and shape the
                  future of MetaWar. Express your identity, connect with the
                  community, and trade your assets securely through blockchain
                  technology for a player-driven economy.
                </p>
                <Link
                  href="https://drive.google.com/file/d/1Qo44wMRSBPVX_7RcTcatC4nJ046T6SJk/view?usp=sharing"
                  target="_blank"
                  rel="nopener noreferrer"
                  className="px-12 py-6 mt-4 inline-block relative -z-0 text-black tracking-widest animate-fill"
                >
                  <span className={`z-10 relative ${blanlgothic.className}`}>
                    Read Whitepaper
                  </span>
                  <svg
                    className="w-full h-full absolute inset-0"
                    viewBox="0 0 242 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                      fill="#FFE600"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                      fill="#FFE600"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
          <section
            className={`relative bg-[url(/BG-02.png)] bg-cover bg-center max-lg:bg-right lg:bg-fixed ${blanlgothic.className}`}
          >
            <div className="container mx-auto px-10 max-lg:py-44 lg:h-screen relative">
              <div className="lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:right-0 text-center lg:text-right">
                <p className="text-lg lg:text-xl tracking-[0.3em]">
                  introducing the wager model
                </p>
                <p className="text-[#FFE600] text-lg lg:text-xl tracking-[0.3em]">
                  Elevating Your MetaWar <br />
                  Experience
                </p>
                <h3 className={`${abnes.className}  text-2xl lg:text-7xl mt-4`}>
                  <span className="block">battle</span>
                  <span className="block text-[#FFE600]">royale</span>
                </h3>
                <p
                  className={`mt-8 lg:w-screen max-w-2xl tracking-wide max-lg:text-sm`}
                >
                  Embark on thrilling battles, own in-game assets, and shape the
                  future of MetaWar. Express your identity, connect with the
                  community, and trade your assets securely through blockchain
                  technology for a player-driven economy.
                </p>
                <Link
                  href="/"
                  className="px-12 py-6 mt-4 inline-block relative -z-0 text-black tracking-widest animate-fill"
                >
                  <span className={`z-10 relative ${blanlgothic.className}`}>
                    Create call sign
                  </span>
                  <svg
                    className="w-full h-full absolute inset-0 transform -scale-x-100"
                    viewBox="0 0 242 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                      fill="#FFF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                      fill="#FFF"
                    />
                  </svg>
                </Link>
                <div className="flex lg:justify-end mt-20">
                  <img src="./Gun.png" width={500}/>
                </div>
              </div>
            </div>
          </section>
          <section
            className={`relative bg-[url(/BG-05.png)] lg:bg-fixed bg-cover bg-center ${blanlgothic.className}`}
            id="modes"
          >
            <div className="pt-20 max-lg:py-44 mx-auto container px-10 relative">
              <img src="/mg.svg" alt="MG token" className="lg:hidden mb-6" />
              <h3 className={`${abnes.className} text-3xl lg:text-7xl`}>
                <span className="block">in-game</span>
                <span className="block text-[#FFE600]">currency</span>
              </h3>
              <p
                className={`mt-8 lg:w-screen max-w-5xl leading-loose lg:tracking-wide max-lg:text-sm max-lg:text-justify`}
              >
                Imagine entering the battlefield, not just for glory, but also for
                the opportunity to earn MetaGems, our in-game currency. Every
                match becomes a thrilling showdown, where you can test your
                intuition and prediction abilities. Bet on your own performance,
                make precise predictions, and potentially reap rewards from your
                wagers. Whether you’re engaged in intense Battle Royale battles or
                strategic multiplayer modes, the Wager Model adds a unique
                dimension, making each game more exciting and competitive than
                ever before.
              </p>
              <Link
                href="/"
                className="px-12 py-6 mt-4 inline-block relative -z-0 text-black tracking-widest animate-fill"
              >
                <span className={`z-10 relative ${blanlgothic.className}`}>
                  Learn more
                </span>
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox="0 0 242 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                    fill="#FFE600"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                    fill="#FFE600"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center pb-20 relative">
              <div className="bg-[url(/card_ffo.png)] aspect-[686/794] w-80 bg-cover relative overflow-hidden pt-9 px-5 hover:transform hover:transition-transform hover:scale-125 hover:z-50 duration-300">
                <h4 className="tracking-[0.2em] block mb-4 text-xl text-[#FFE600]">
                  Free for all
                </h4>
                <p className="text-xs tracking-wide leading-relaxed">
                  Free for All mode puts your individual skills to the test as
                  you battle against multiple players, map knowledge and quick
                  reflexes to come out on top.
                </p>
                <div className="px-4 absolute -bottom-6">
                  <img
                    src="/free_for_all.png"
                    alt="Free for all"
                    className=""
                  />
                </div>
                <Link
                    href="/"
                    className="px-10 py-8 mt-4 inline-block relative -bottom-20 -right-28 -z-0 text-black"
                  >
                    <span className={`z-10 relative flex items-center gap-4 ${blanlgothic.className}`}>
                      join <GoArrowRight />
                    </span>
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 242 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                        stroke="none"
                        fill="#FFE600"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke="none"
                        d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                        fill="#FFE600"
                      />
                  </svg>
                </Link>
              </div>
              <div className="bg-[url(/card_br.png)] aspect-[686/794] w-80 bg-cover relative overflow-hidden pt-9 px-5 hover:transform hover:transition-transform hover:scale-125 hover:z-50 duration-300">
                <h4 className="tracking-[0.2em] block mb-4 text-xl text-[#FFE600]">
                  Battle Royale
                </h4>
                <p className="text-xs tracking-wide leading-relaxed">
                  Battle Royale mode offers an intense and thrilling experience
                  for players seeking adrenaline-pumping battles and strategic
                  gameplay.
                </p>
                <div className="px-4 absolute -bottom-6">
                  <img
                    src="/battle_royale.png"
                    alt="battle royale"
                    className=""
                  />
                </div>
                <Link
                    href="/"
                    className="px-10 py-8 mt-4 inline-block relative -bottom-24 -right-28 -z-0 text-black"
                  >
                    <span className={`z-10 relative flex items-center gap-4 ${blanlgothic.className}`}>
                      join <GoArrowRight />
                    </span>
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 242 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                        stroke="none"
                        fill="#FFE600"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke="none"
                        d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                        fill="#FFE600"
                      />
                  </svg>
                </Link>
              </div>
              <div className="bg-[url(/card_elem.png)] aspect-[686/794] w-80 bg-cover relative overflow-hidden pt-9 px-5 hover:transform hover:transition-transform hover:scale-125 hover:z-50 duration-300">
                <h4 className="tracking-[0.2em] block mb-4 text-xl text-[#FFE600]">
                  Elimination
                </h4>
                <p className="text-xs tracking-wide leading-relaxed">
                  Team up with others to eliminate the opposing team and secure
                  victory.
                </p>
                <div className="pl-4 absolute -bottom-12">
                  <img src="/elimination.png" alt="Free for all" className="" />
                </div>
                <Link
                    href="/"
                    className="px-10 py-8 mt-4 inline-block relative -bottom-36 -right-28 -z-0 text-black"
                  >
                    <span className={`z-10 relative flex items-center gap-4 ${blanlgothic.className}`}>
                      join <GoArrowRight />
                    </span>
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 242 56"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                        stroke="none"
                        fill="#FFE600"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        stroke="none"
                        d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                        fill="#FFE600"
                      />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
          <section
            className={`relative bg-[url(/BG-03.png)] bg-cover lg:bg-fixed ${blanlgothic.className}`}
          >
            <div className="container mx-auto px-10 max-lg:py-44 lg:h-screen relative">
              <div className="lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:right-0 text-center lg:text-right w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <img src="/Gun-v3.png" width={350} className="flex justify-start pb-10 lg:pb-0" />
                  <div>
                    <p className="text-2xl tracking-[0.3em]">
                      Intense Battles and
                    </p>

                    <h3
                      className={`${abnes.className} text-3xl lg:text-7xl mt-4`}
                    >
                      <span className="block">Strategic</span>
                      <span className="block text-[#FFE600]"> Gameplay</span>
                    </h3>
                    <p
                      className={`mt-8 lg:w-screen max-w-4xl lg:tracking-wide max-lg:text-sm max-lg:text-justify`}
                    >
                      In MetaWar, get ready for an adrenaline-pumping gaming
                      experience packed with intense battles and strategic
                      gameplay. As metahumans, you’ll dive into fast-paced combat,
                      wielding a variety of weapons to outsmart your foes and
                      claim victory. Strategic thinking is key in MetaWar. Analyze
                      the battlefield, adapt your tactics, and use the environment
                      to your advantage. With a range of modes, including Battle
                      Royale, multiplayer options, and a vast open world, the game
                      caters to diverse playstyles and preferences.
                    </p>
                    <Link
                      href="/"
                      className="px-12 py-6 mt-4 inline-block relative -z-0 text-black tracking-widest animate-fill"
                    >
                      <span className={`z-10 relative ${blanlgothic.className}`}>
                        Play Now
                      </span>
                      <svg
                        className="w-full h-full absolute inset-0 transform -scale-x-100"
                        viewBox="0 0 242 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.939545 0H206.452V55.5439H0.939545V0Z"
                          fill="#FFF"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                          fill="#FFF"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                    
              </div>
            </div>
          </section>
        </main>
    )
}