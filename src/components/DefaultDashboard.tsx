import { useEffect, useState } from 'react';

import { useSpotify } from '@/hooks';
import { Category } from '@/types';

const DefaultDashboard = () => {
  const spotifyApi = useSpotify();

  const [categories, setCategories] = useState<Category[] | null>(null);

  const getSomething = async () => {
    const response = await spotifyApi.getCategories();
    setCategories(response.body.categories.items);
    console.log('response ', response);
  };

  useEffect(() => {
    getSomething();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi]);

  /**
   * TODO: getCategory
   * TODO: getPlaylistsForCategory
   */

  if (!categories) return <></>;

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <p>{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default DefaultDashboard;
