import React from 'react';
import getAllRooms from '@/app/actions/getAllRooms';

// ---------------------Import Internes -----------------------------

import RoomList from './RoomList';

const Rooms = async () => {
  // --------------------- fonctions -----------------------------

  const rooms = await getAllRooms();

  // --------------------- Return -----------------------------
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex flex-col min-h-screen bg-red-200 h-full gap-2 items-center justify-center">
          {rooms.length > 0 && <RoomList rooms={rooms} />}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
