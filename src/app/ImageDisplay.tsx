import { useCardStore } from "@/app/store";
import Image from "next/image";
import { Fragment } from "react";

export const ImageDisplay = () => {
  const { currentCard, round, revealed } = useCardStore();
  const getPixelSize = (round: number): number => {
    switch (round) {
      case 1:
        return 48; // Very low resolution
      case 2:
        return 24;
      case 3:
        return 16;
      case 4:
        return 8;
      case 5:
        return 4; // Original resolution
      default:
        return 1;
    }
  };

  const pixelSize = getPixelSize(round);
  const WEB_WIDTH = 488;
  const WEB_HEIGHT = 680;
  const mobileWidth = document.body.clientWidth - 16;
  const mobileHeight = mobileWidth * (WEB_HEIGHT / WEB_WIDTH);
  if (!currentCard) return null;
  return (
    <div
      style={{
        height: Math.min(mobileHeight, WEB_HEIGHT),
        overflow: "hidden",
      }}
      className={`relative md:w-[488px] w-full`}
    >
      <div
        style={{
          transform: `scale(${pixelSize})`,
          transformOrigin: "top left",
          imageRendering: "pixelated",
        }}
        className="w-full h-full"
      >
        <Image
          src={currentCard.image_uris.normal}
          width={Math.floor(WEB_WIDTH / pixelSize)}
          height={Math.ceil(WEB_HEIGHT / pixelSize)}
          alt={currentCard.name}
          layout="fixed"
          className="hidden md:block"
        />
        <Image
          width={mobileWidth / pixelSize}
          height={mobileHeight / pixelSize}
          src={currentCard.image_uris.normal}
          alt={currentCard.name}
          className="block md:hidden"
        />
      </div>
      {!revealed && (
        <div className="absolute md:top-8 top-7 md:left-10 left-6 md:w-[340px] md:h-[40px] h-[20px] w-[240px] bg-gray-200"></div>
      )}
    </div>
  );
};
