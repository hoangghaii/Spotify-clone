import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import DefaultDashboard from '@/components/DefaultDashboard';
import Songs from '@/components/Songs';
import { usePlayListContext } from '@/contexts';
import { getSessionOfDay, pickRandom } from '@/utils';

import UserPlaceholder from '../../public/images/user.png';

const colours = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const {
    playlistContextState: { selectedPlaylistId, selectedPlaylist },
  } = usePlayListContext();

  const sessionOfDay = getSessionOfDay();

  const { data: session } = useSession();

  const [fromColor, setFromColor] = useState<string | null>(null);

  useEffect(() => {
    setFromColor(pickRandom(colours));
  }, [selectedPlaylistId]);

  return (
    <div className="flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hidden">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full py-1 pl-2 pr-2 overflow-hidden"
          onClick={() => signOut()}
        >
          <Image
            src={session?.user?.image || UserPlaceholder}
            alt="User avatar"
            height={40}
            width={40}
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="icon" />
        </div>
      </header>

      {selectedPlaylist ? (
        <>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b ${fromColor} to-black h-44 p-8`}
          >
            <Image
              src={selectedPlaylist.images[0].url}
              alt="Playlist Image"
              height={176}
              width={176}
              className="shadow-2xl"
            />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {selectedPlaylist.name}
              </h1>
            </div>
          </section>

          <div>
            <Songs />
          </div>
        </>
      ) : session ? (
        <>
          <section
            className={`space-x-7 bg-gradient-to-b ${fromColor} to-black h-44 p-8`}
          >
            <h1 className="uppercase text-2xl font-bold md:text-3xl xl:text-5xl">
              GOOD {sessionOfDay}
            </h1>
          </section>
          <DefaultDashboard />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Center;
