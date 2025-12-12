import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import { SearchParamProps } from '@/types';
import Image from 'next/image';

const Register = async ({ params }: SearchParamProps) => {
  const { userId } = await params;

  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className=" sub-container max-w-[860px] flex-col py-10">
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

          <RegisterForm user={user} />

          <p className="justify-items-end text-dark-600 xl:text-left py-12">
            &copy; {new Date().getFullYear()} MediCare+ | All Rights Reserved
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        alt="register image"
        width={1000}
        height={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
