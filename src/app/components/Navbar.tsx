
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

            <div className="border-b border-gray-300 sticky top-0 z-50 bg-base-100">
                <div className=" flex justify-between navbar container mx-auto">
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
                        <button className="btn-sm sm:btn-md hover:cursor-pointer">
                            সাইন ইন
                        </button>
                        <button className="btn btn-success bg-green-600 btn-sm sm:btn-md text-white rounded-lg md:px-5">
                            সাইন আপ
                        </button>
                    </div>
                </div>
                <NavLinks/>
            </div>
            
        );
    };

    export default NavPage;