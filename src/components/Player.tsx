/* eslint-disable no-undef */
import {
  ArrowPathRoundedSquareIcon,
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useDebouncedCallback } from 'use-debounce';

import { useSongContext } from '@/contexts';
import { useSpotify } from '@/hooks';
import { SongReducerActionType } from '@/types';

const Player = () => {
  const {
    songContextState: { isPlaying, selectedSong, deviceId, volume },
    dispatchSongAction,
  } = useSongContext();

  const spotifyApi = useSpotify();

  const handlePlayPause = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();

    if (!response.body) return;

    if (response.body.is_playing) {
      await spotifyApi.pause();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: false,
      });
    } else {
      await spotifyApi.play();
      dispatchSongAction({
        type: SongReducerActionType.ToggleIsPlaying,
        payload: true,
      });
    }
  };

  const handleSkipSong = async (skipTo: 'prev' | 'next') => {
    if (!deviceId) return;

    if (skipTo === 'prev') await spotifyApi.skipToPrevious();
    else if (skipTo === 'next') await spotifyApi.skipToNext();

    const songInfo = await spotifyApi.getMyCurrentPlayingTrack();

    if (!songInfo.body) return;

    dispatchSongAction({
      type: SongReducerActionType.SetCurrentPlayingSong,
      payload: {
        selectedSongId: songInfo.body.item?.id,
        selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
        isPlaying: songInfo.body.is_playing,
      },
    });
  };

  const debounceAdjustVolume = useDebouncedCallback((volume: number) => {
    spotifyApi.setVolume(volume);
  }, 1000);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(e.target.value);

    if (!deviceId) return;

    debounceAdjustVolume(volume);

    dispatchSongAction({
      type: SongReducerActionType.SetVolume,
      payload: volume,
    });
  };

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        {selectedSong && (
          <>
            <div className="hidden md:block">
              <Image
                src={selectedSong.album.images[0].url}
                alt={selectedSong.album.name}
                height={40}
                width={40}
              />
            </div>
            <div>
              <h3>{selectedSong.name}</h3>
              <p>{selectedSong.artists[0].name}</p>
            </div>
          </>
        )}
      </div>

      {/* CENTER */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="icon-playback" />

        <BackwardIcon
          className="icon-playback"
          onClick={() => handleSkipSong('prev')}
        />

        {isPlaying ? (
          <PauseCircleIcon
            className="icon-playback"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleIcon className="icon-playback" onClick={handlePlayPause} />
        )}

        <ForwardIcon
          className="icon-playback"
          onClick={() => handleSkipSong('next')}
        />

        <ArrowPathRoundedSquareIcon className="icon-playback" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <SpeakerXMarkIcon className="icon-playback" />
        <input
          type="range"
          min={0}
          max={100}
          className="w-20 md:w-auto"
          value={volume}
          onChange={handleVolumeChange}
        />
        <SpeakerWaveIcon className="icon-playback" />
      </div>
    </div>
  );
};

export default Player;
