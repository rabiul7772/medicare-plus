import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO- OTP verification | passkey modal */}
      <section className="remove-scrollbar container my-auto">
        <div className=" sub-container max-w-[496px]">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/medicarelogo.png"
              alt="logo"
              height={1000}
              width={1000}
              className="mb-12 h-10 w-fit rounded-xl"
            />{' '}
            <span className="mt-2 text-xl font-semibold text-white tracking-wide">
              MediCare+
            </span>
          </div>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; {new Date().getFullYear()} MediCare+ | All Rights Reserved
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        alt="onboarding image"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
