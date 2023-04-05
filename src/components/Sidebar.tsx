import {
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/24/outline';

import { usePlayListContext } from '@/contexts';
import { useSpotify } from '@/hooks';

import IconButton from './IconButton';

const Divider = () => {
  return <hr className="border-t-[0.1px] border-gray-900" />;
};

const Sidebar = () => {
  const spotifyApi = useSpotify();

  const {
    playlistContextState: { playlists },
    updatePlaylistContextState,
  } = usePlayListContext();

  const onChoosePlaylist = async (playlistId: string) => {
    const playlistResponse = await spotifyApi.getPlaylist(playlistId);

    updatePlaylistContextState({
      selectedPlaylistId: playlistId,
      selectedPlaylist: playlistResponse.body,
    });
  };

  return (
    <div className="text-gray-500 px-5 pt-5 pb-36 text-xs lg:text-sm border-r border-gray-900 h-screen overflow-y-scroll sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block scrollbar-hidden">
      <div className="space-y-4">
        <IconButton icon={<HomeIcon className="icon" />} label="Home" />
        <IconButton
          icon={<MagnifyingGlassIcon className="icon" />}
          label="Search"
        />
        <IconButton
          icon={<BuildingLibraryIcon className="icon" />}
          label="Your Library"
        />
        <Divider />

        <IconButton
          icon={<PlusCircleIcon className="icon" />}
          label="Create Playlist"
        />
        <IconButton icon={<HeartIcon className="icon" />} label="Liked Songs" />
        <IconButton
          icon={<RssIcon className="icon" />}
          label="Your epsisodes"
        />
        <Divider />

        {/* Playlists */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => onChoosePlaylist(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
