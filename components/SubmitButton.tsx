import Image from 'next/image';
import { Button } from './ui/button';

interface ButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton = ({ isLoading, children, className }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={
        className ??
        'bg-green-500 text-white w-full hover:bg-green-400 cursor-pointer'
      }
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="assets/icons/loader.svg"
            height={24}
            width={24}
            alt="loader"
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
