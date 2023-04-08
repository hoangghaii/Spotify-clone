/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Dispatch } from 'react';

export enum TokenError {
  RefreshAccessTokenError = 'RefreshAccessTokenError',
}

export type ExtendedToken = JWT & {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
};

export type ExtendedSession = Session & {
  accessToken: ExtendedToken['accessToken'];
  error: ExtendedToken['error'];
};

export type PlaylistContextState = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylistId: string | null;
  selectedPlaylist: SpotifyApi.SinglePlaylistResponse | null;
};

export type PlaylistContext = {
  playlistContextState: PlaylistContextState;
  updatePlaylistContextState: (
    updatedObj: Partial<PlaylistContextState>
  ) => void;
};

export type SongContextState = {
  selectedSongId?: string;
  selectedSong: SpotifyApi.TrackObjectFull | null;
  isPlaying: boolean;
  volume: number;
  deviceId: string | null;
};

export type ISongContext = {
  songContextState: SongContextState;
  dispatchSongAction: Dispatch<SongReducerAction>;
};

export enum SongReducerActionType {
  SetDevice = 'SetDevice',
  ToggleIsPlaying = 'ToggleIsPlaying',
  SetCurrentPlayingSong = 'SetCurrentPlayingSong',
  SetVolume = 'SetVolume',
}

export type SongReducerAction =
  | {
      type: SongReducerActionType.SetDevice;
      payload: Pick<SongContextState, 'deviceId' | 'volume'>;
    }
  | {
      type: SongReducerActionType.ToggleIsPlaying;
      payload: boolean;
    }
  | {
      type: SongReducerActionType.SetCurrentPlayingSong;
      payload: Pick<
        SongContextState,
        'selectedSongId' | 'selectedSong' | 'isPlaying'
      >;
    }
  | {
      type: SongReducerActionType.SetVolume;
      payload: number;
    };

export type Category = {
  href: string;
  icons: SpotifyApi.ImageObject[];
  id: string;
  name: string;
};
