export type CardImages = {
  normal: string;
}

export type CardData = {
  name: string;
  image_uris: CardImages;
  set_name: string;
}

export const isCardImages = (images: any): images is CardImages => {
  if (typeof images !== "object") return false;
  if (!images.normal) return false;
  return true;
};

export const isCardData = (data: any): data is CardData => {
  if (typeof data !== "object") return false;
  if (!data.name) return false;
  if (!isCardImages(data.image_uris)) return false;
  return true;
};
