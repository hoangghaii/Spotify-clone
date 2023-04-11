import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useSpotify } from '@/hooks';
import { Category, PlayListForCategory } from '@/types';

type Props = {
  item: Category;
};

const CategoryItem = ({ item }: Props) => {
  const spotifyApi = useSpotify();

  const [playList, setPlayList] = useState<PlayListForCategory[] | null>(null);

  const getPlayListForCategory = async () => {
    const response = await spotifyApi.getPlaylistsForCategory(item.id, {
      limit: 4,
    });
    if (!response) return;
    setPlayList(response.body.playlists.items);
  };

  useEffect(() => {
    getPlayListForCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  if (!playList) return <></>;

  return (
    <div className="mb-10">
      <h2 className="pl-5 text-2xl font-bold">{item.name}</h2>

      <div className="grid grid-cols-4 gap-4 px-5 py-4">
        {playList.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-zinc-950 hover:bg-zinc-800 rounded-lg cursor-pointer space-x-4 px-5 py-5"
          >
            <Image
              src={track.images[0].url}
              alt={track.name}
              height={170}
              width={170}
              className="mb-9"
            />
            <div className=" text-white">
              <h4 className="w-33 lg:w-52 text-base text-left capitalize font-semibold mb-1">
                {track.name}
              </h4>
              <p className="w-52 truncate">{track.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
