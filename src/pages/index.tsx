import Center from '@/components/Center';
import Player from '@/components/Player';
import Sidebar from '@/components/Sidebar';
import PlayListContextProvider from '@/contexts/PlayListContext';
import SongContextProvider from '@/contexts/SongContext';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <PlayListContextProvider>
        <SongContextProvider>
          <main className="flex">
            <Sidebar />
            <Center />
          </main>

          <div className="sticky bottom-0 text-white">
            <Player />
          </div>
        </SongContextProvider>
      </PlayListContextProvider>
    </div>
  );
}
