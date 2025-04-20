import { Room } from '@/types/roomsTypes';

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
export const getImageUrl = (room: Room) => {
  const imageIds = ['mainImage', 'secondImage', 'thirdImage'];
  return imageIds.map((imageId: string) => {
    const propName = `${imageId}`;
    return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room[propName]}/view?project=${projectId}`;
  });
};
