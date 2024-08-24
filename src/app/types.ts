export type CardImages = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
}

export type CardData = {
  name: string;
  image_uris: CardImages;
  set_name: string;
}

export const isCardImages = (images: any): images is CardImages => {
  if (typeof images !== "object") return false;
  if (!images.small) return false;
  if (!images.normal) return false;
  if (!images.large) return false;
  if (!images.png) return false;
  if (!images.art_crop) return false;
  if (!images.border_crop) return false;
  return true;
};

export const isCardData = (data: any): data is CardData => {
  if (typeof data !== "object") return false;
  if (!data.name) return false;
  if (!data.set_name) return false;
  if (!isCardImages(data.image_uris)) return false;
  return true;
};
