import { GetServerSideProps } from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

import Logo from '../../public/images/spotify-logo.png';

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

const Login = ({ providers }: Props) => {
  const { name: providerName, id: providerId } =
    providers?.spotify as ClientSafeProvider;

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen">
      <div className="mb-6">
        <Image src={Logo} alt="Spotify Logo" width={200} height={200} />
      </div>
      <button
        className="bg-[#18D860] text-white p-5 rounded-full"
        onClick={() => {
          signIn(providerId, { callbackUrl: '/' });
        }}
      >
        Login with {providerName}
      </button>
    </div>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
