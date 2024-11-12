import Link from 'next/link';

type SuccessMessageProps = {
  projectCode: string;
};

export function SuccessMessage({ projectCode }: SuccessMessageProps) {
  return (
    <div className="max-w-md mx-auto mt-8">
      <p className="text-lg mb-4 text-green-500">
        Thank you for sending us this important information about {projectCode}!
      </p>
      <p className="mb-4">
        <Link
          href="https://www.apple.com/apple-music/"
          className="text-blue-600 hover:underline"
        >
          Click here for 3 months of Apple Music free.
        </Link>
      </p>
    </div>
  );
}
