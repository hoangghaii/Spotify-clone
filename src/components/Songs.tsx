import Song from '@/components/Song';
import { usePlayListContext } from '@/contexts';

const Songs = () => {
  const {
    playlistContextState: { selectedPlaylist },
  } = usePlayListContext();

  if (!selectedPlaylist) return <></>;

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28">
      {selectedPlaylist.tracks.items.map((item, index) => (
        <Song
          key={item.track?.id || item.track?.href || item.track?.uri}
          item={item}
          itemIndex={index}
        />
      ))}
    </div>
  );
};

export default Songs;
