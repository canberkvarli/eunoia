import { getProviders } from "next-auth/react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default async function LoginPage() {
  const providers = (await getProviders()) ?? {};

  return (
    <SessionProviderWrapper>
      <div className="relative flex items-center h-screen w-screen overflow-hidden justify-end">
        <Image
          src="https://static.accelerator.net/134/0.51.2/onboard/images/v2/gradient_global.png"
          alt="Gradient Background"
          layout="fill"
          objectFit="cover"
        />

        <svg className="absolute w-[900px] h-[900px] right-[15rem] mb-[3rem]">
          <path
            d="M430.539711 822.607005 C 318.7853722 798.5452561999999 220.923093 709.9620962 185.88401 601.149122 150.84492699999998 492.33614780000005 178.6290408 363.29335599999996 255.344296 278.542134 332.0595512 193.790912 457.70594719999997 153.3312632 569.460286 177.393012 681.2146248 201.4547608 779.0769064 290.0379072 814.11599 398.850878 849.1550736 507.66384880000004 821.3709598 636.7066406 744.655704 721.457866 667.9404482 806.2090913999999 542.2940498 846.6687538 430.539711 822.607005z"
            fill="rgb(255, 255, 255)"
          />
        </svg>

        <div className="absolute h-[52rem] z-10 w-[40rem] bg-[#F9FAFB] p-10 rounded-3xl shadow-2xl backdrop-blur-md border border-gray-200">
          <AuthForm providers={providers} />
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
