import clsx from "clsx";
import localFont from "next/font/local";
import Image from "next/image";

const blanlgothic = localFont({ src: "../bankgothic-regular.ttf" });

const abnes = localFont({ src: "../abnes.ttf" });

const Staking = () => {
  return (
    <div
      className={clsx(
        "mt-12 flex max-lg:flex-col lg:items-start gap-8 container lg:px-10 mx-auto",
        blanlgothic.className
      )}
    >
      <div>
        <div className="w-full lg:w-[593px] relative overflow-hidden bg-gradient-to-b from-yellow-950 to-stone-900 shadow border border-white border-opacity-20">
          <div
            className="w-[758px] h-[496px] left-[-78px] top-[213px] -z-10 absolute origin-top-left rotate-[-30deg] opacity-40 bg-opacity-20 blur-[68px]"
            style={{
              backgroundImage:
                "radial-gradient(71.25% 65.91% at 24.52% 39.22%, rgba(248, 239, 162, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), radial-gradient(73.26% 68.52% at 70.97% 38.25%, rgba(255, 135, 25, 0.30) 0%, rgba(246, 117, 89, 0.30) 50.52%, rgba(232, 153, 0, 0.30) 93.75%)",
            }}
          />
          <div
            className={clsx(
              "p-6 border-b border-white/10 w-full font-bold text-[2rem]",
              abnes.className
            )}
          >
            Staking
          </div>
          <div className="p-6 border-b border-white/10 w-full font-bold">
            <div className={clsx("mb-4 text-xl", abnes.className)}>
              Total Staked
            </div>
            <div className="flex gap-3 items-center">
              <Image
                width={54}
                height={54}
                src="/icons/token.svg"
                alt="MG coin"
              />
              <div className="text-[2rem]">0</div>
            </div>
          </div>
          <div className="p-6 border-b border-white/10 w-full font-bold">
            <div className={clsx("mb-4 text-xl", abnes.className)}>
              Available in Wallet
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Image
                  width={54}
                  height={54}
                  src="/icons/token.svg"
                  alt="MG coin"
                />
                <div className="text-[2rem]">0</div>
              </div>
              <a
                href="/"
                className="px-12 py-6 mt-4 inline-block relative -z-0 text-black"
              >
                <span className={`z-10 relative ${blanlgothic.className}`}>
                  Buy More MG
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
              </a>
            </div>
          </div>
          <div className="flex p-6 gap-4">
            <button className="w-1/2 py-4 bg-white font-bold border border-white text-black opacity-30 cursor-not-allowed">
              Stake
            </button>
            <button className="w-1/2 py-4 font-bold border border-white/20">
              Unstake
            </button>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-b from-green-950 to-slate-900 border border-white/20 flex items-center justify-between mt-6 lg:w-[593px]">
          <div className="font-semibold text-lg">Claim your MG</div>
          <button className="relative px-6 py-4 inline-block">
            <span className={`z-10 relative ${blanlgothic.className} text-black`}>
              Claim
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
                fill="#FFF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                stroke="none"
                d="M206.452 0L242 32.9149V55.5439L206.452 55.5439V0Z"
                fill="#FFF"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex max-lg:flex-col gap-8">
          <div className="p-6 bg-gradient-to-b w-full from-green-950 to-slate-900 border border-white/20">
            <div className={clsx("mb-4 text-xl font-bold", abnes.className)}>
              Total Staked
            </div>
            <div className="flex gap-3 items-center mb-4">
              <Image
                width={34}
                height={34}
                src="/icons/token.svg"
                alt="MG coin"
              />
              <div className="text-[2rem] font-bold">1000</div>
            </div>
            <div className="text-slate-400">${0.001}</div>
          </div>
          <div className="p-6 bg-gradient-to-b w-full from-green-950 to-slate-900 border border-white/20">
            <div className={clsx("mb-4 text-xl font-bold", abnes.className)}>
              Estimated Rewards
            </div>
            <div className="text-[2rem] font-bold mb-4">1000%</div>
            <div className="text-slate-400">APR</div>
          </div>
        </div>
        <div className="mt-8 bg-gradient-to-b w-full from-green-950 to-slate-900 border border-white/20">
          <div
            className={clsx(
              "p-6 border-b border-white/10 w-full font-bold text-xl",
              abnes.className
            )}
          >
            Stats
          </div>
          <div className="flex max-lg:flex-col max-lg:divide-y lg:divide-x divide-white/20">
            <div className="p-6 w-full">
              <div className="mb-4">Price</div>
              <div className="flex gap-3 items-center mb-4">
                <Image
                  width={34}
                  height={34}
                  src="/icons/token.svg"
                  alt="MG coin"
                />
                <div className="text-[2rem] font-bold">$0.001</div>
              </div>
            </div>
            <div className="p-6 w-full">
              <div className="mb-4">10K MG Daily Rewards</div>
              <div className="flex gap-3 items-center mb-4">
                <Image
                  width={34}
                  height={34}
                  src="/icons/token.svg"
                  alt="MG coin"
                />
                <div className="text-[2rem] font-bold">273</div>
              </div>
            </div>
            <div className="p-6 w-full">
              <div className="mb-4">$ETH Daily Rewards</div>
              <div className="flex gap-3 items-center mb-4">
                <Image
                  width={34}
                  height={34}
                  src="/icons/token.svg"
                  alt="MG coin"
                />
                <div className="text-[2rem] font-bold">$125.36</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-[#212742] mt-8">
          <div>Staking Rewards</div>
          <p className="text-slate-400 text-sm mt-1">
            10% Profit on all trades are distributed between stakers that commit
            SUPER tokens, along with 1% from tax on volume.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="pt-24 pb-32 max-lg:px-4">
      <Staking />
    </div>
  );
}
