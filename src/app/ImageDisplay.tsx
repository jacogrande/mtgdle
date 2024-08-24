import { useCardStore } from "@/app/store";
import Image from "next/image";

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
  if (!currentCard) return null;
  return (
    <div
      style={{
        width: "488px",
        height: "680px",
        overflow: "hidden",
      }}
      className="relative"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${pixelSize})`,
          transformOrigin: "top left",
          imageRendering: "pixelated",
        }}
      >
        <Image
          src={currentCard.image_uris.normal}
          width={Math.floor(488 / pixelSize)}
          height={Math.ceil(680 / pixelSize)}
          alt={currentCard.name}
          layout="fixed"
        />
      </div>
      {!revealed && <div className="absolute top-8 left-10 w-[340px] h-[40px] bg-gray-200"></div>}
    </div>
  );
};
