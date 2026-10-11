
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo-icon.png";
import NavLinks from "./NavLinks";



    const NavPage = () => {


        const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        }
        );

        return (

            <div>
                <div className=" flex justify-between navbar bg-base-100 container mx-auto">
                    <div className="navbar-start">

                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-8 sm:size-9 md:size-10 items-center justify-center rounded-xl bg-green-600">
                                <Image 
                                    className="size-5" 
                                    src={Logo} 
                                    alt=""
                                    height={10}
                                    width={10} 
                                />
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-sm sm:text-lg md:text-xl font-bold leading-7 tracking-[-0.5px]  text-gray-800">
                                    বাজার দর
                                </h1>
                                <p className="md:min-h-4 text-[10px] md:text-xs leading-4 text-gray-700">{date}</p>
                            </div>
                        </Link>


                    </div>

                    <div className='flex gap-4'>
                        <button className="text-xs sm:text-base md:text-lg">
                            সাইন ইন
                        </button>
                        <button className="bg-green-600 text-xs sm:text-base md:text-lg px-1.5 py-1.5 sm:px-2.5 sm:py-1.5 md:px-3 md:py-2 shadow-lg shadow-black/50 rounded-xl">
                            সাইন আপ
                        </button>
                    </div>
                </div>
                <NavLinks/>
            </div>
            
        );
    };

    export default NavPage;