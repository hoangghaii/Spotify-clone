/* eslint-disable no-undef */
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Artist from '@/components/Artist';
import CategoryItem from '@/components/CategoryItem';
import { useSpotify } from '@/hooks';
import { Artist as ArtistType, Category, Track } from '@/types';

const DefaultDashboard = () => {
  const spotifyApi = useSpotify();

  const [topTracks, setTopTracks] = useState<Track[] | null>(null);
  const [topArtists, setTopArtists] = useState<ArtistType[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const getDefaultDashboard = async () => {
    const response = await Promise.all([
      spotifyApi.getMyTopTracks({ limit: 6 }),
      spotifyApi.getMyTopArtists({ limit: 6 }),
      spotifyApi.getCategories({ limit: 6 }),
    ]);

    setTopTracks(response[0].body.items);
    setTopArtists(response[1].body.items);
    setCategories(response[2].body.categories.items);
    console.log(response);
  };

  useEffect(() => {
    getDefaultDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  if (!categories || !topTracks || !topArtists) return <></>;

  return (
    <div className="pb-16">
      <div className="grid grid-cols-3 grid-rows-2 gap-4 px-5 py-4 mb-10">
        {topArtists.map((artist, index) => (
          <Artist key={index} item={artist} />
        ))}
      </div>
      <div className="mb-10">
        <h3 className="pl-5 text-2xl font-bold capitalize">top tracks</h3>
        <div className="grid grid-cols-3 grid-rows-2 gap-5 px-5 py-4">
          {topTracks.map(({ album, artists, name }, index) => {
            return (
              <div
                key={index}
                className="flex flex-col item-center bg-zinc-950 hover:bg-zinc-800 rounded-lg cursor-pointer space-x-4 px-5 py-5"
              >
                <Image
                  src={album.images[0].url}
                  alt={name}
                  height={250}
                  width={250}
                  className="mb-9"
                />
                <div className=" text-white">
                  <h4 className="w-full text-[20px] text-left capitalize font-semibold mb-1">
                    {name}
                  </h4>
                  <div className="w-56 truncate text-[15px]">
                    {artists.map((artist, index) => {
                      return (
                        <p key={index} className="inline">
                          <span className="font-medium">{artist.name}</span>
                          {index === artists.length - 1 ? '' : ' ft. '}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {categories.map((category, index) => (
          <CategoryItem key={index} item={category} />
        ))}
      </div>
    </div>
  );
};

export default DefaultDashboard;
