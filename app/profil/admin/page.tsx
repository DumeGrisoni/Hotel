import React from 'react';
import Image from 'next/image';

// ------------------ Import Internes ----------------------------
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminRooms from '@/components/admin/AdminRooms';
import AdminRestaurant from '@/components/admin/AdminRestaurant';

const AdminDashbord = async () => {
  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-start gap-3 mt-10">
      <Image
        src={'/assets/heading-icon.svg'}
        width={82}
        height={20}
        alt="icon-logo"
        priority
      />
      <h1 className="h3 mb-14 md:mb-8">Tableau de bord</h1>

      <Tabs
        className="w-full flex-1 flex-col items-center gap-4"
        defaultValue="tab1"
        orientation="horizontal"
      >
        <TabsList className="flex flex-col md:flex-row md:gap-6 mb-10 md:mb-6">
          <TabsTrigger value="tab1">Réservations</TabsTrigger>
          <TabsTrigger value="tab2">Chambres</TabsTrigger>
          <TabsTrigger value="tab3">Restaurant</TabsTrigger>
        </TabsList>
        <div className="separator w-[95%] " />
        <TabsContent value="tab1" className="w-full">
          <AdminBookings />
        </TabsContent>
        <TabsContent value="tab2" className="w-full">
          <AdminRooms />
        </TabsContent>
        <TabsContent value="tab3" className="w-full">
          <AdminRestaurant />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminDashbord;
