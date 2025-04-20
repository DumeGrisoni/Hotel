'use cache';
import React from 'react';

// ---------------------Import Internes -----------------------------

import { getAllRooms } from '../actions/roomCrud';
import RoomList from '@/components/RoomList';

const RoomsPage = async () => {
  // ---------------------Fonctions -----------------------------

  const rooms = await getAllRooms();

  // ---------------------Return -----------------------------

  return (
    <section>
      <div className="container mx-auto">
        <div className="">{rooms.length > 0 && <RoomList rooms={rooms} />}</div>
      </div>
    </section>
  );
};

export default RoomsPage;
