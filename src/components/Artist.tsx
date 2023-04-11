import Image from 'next/image';

import { Artist as ArtistType } from '@/types';

type Props = {
  item: ArtistType;
};

const Artist = ({ item }: Props) => {
  return (
    <div className="flex flex-row item-center justify-start bg-stone-500 hover:bg-stone-400 opacity-70 rounded-lg cursor-pointer overflow-hidden">
      <Image src={item.images[0].url} alt={item.name} height={70} width={70} />
      <h4 className="w-24 text-lg text-center capitalize font-semibold break-words leading-6 ml-2 my-auto">
        {item.name}
      </h4>
    </div>
  );
};

export default Artist;
