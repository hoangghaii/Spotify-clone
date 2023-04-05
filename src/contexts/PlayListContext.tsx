import { useSession } from 'next-auth/react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useSpotify } from '@/hooks';
import { PlaylistContext, PlaylistContextState } from '@/types';

const defaultPlayListContextState: PlaylistContextState = {
  playlists: [],
  selectedPlaylistId: null,
  selectedPlaylist: null,
};

export const PlayListContext = createContext<PlaylistContext>({
  playlistContextState: defaultPlayListContextState,
  updatePlaylistContextState: () => {},
});

export const usePlayListContext = () => useContext(PlayListContext);

const PlayListContextProvider = ({ children }: { children: ReactNode }) => {
  const spotifyApi = useSpotify();

  const { data: session } = useSession();

  const [playListContext, setPlayListContext] = useState(
    defaultPlayListContextState
  );

  const updatePlayListContext = (updateObj: Partial<PlaylistContextState>) => {
    setPlayListContext((prevPlayListContext) => ({
      ...prevPlayListContext,
      ...updateObj,
    }));
  };

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlayListResponse = await spotifyApi.getUserPlaylists();
      updatePlayListContext({ playlists: userPlayListResponse.body.items });
    };

    if (spotifyApi.getAccessToken()) {
      getUserPlaylists();
    }
  }, [session, spotifyApi]);

  const playListContextProviderData = {
    playlistContextState: playListContext,
    updatePlaylistContextState: updatePlayListContext,
  };

  return (
    <PlayListContext.Provider value={playListContextProviderData}>
      {children}
    </PlayListContext.Provider>
  );
};

export default PlayListContextProvider;
