import LogoSquare from '@/public/trademanager_logo_w1500.png';
import LogoWithText from '@/public/trademanager_logo_with_name_w512.png';
import Image from 'next/image';

const LOGO_ASPECT_RATIO = 1;
const LOGO_WITH_TEXT_ASPECT_RATIO = 2 / 1;

export default function Logo({ width = 64, height, withText = false }: Props) {
  const ASPECT_RATIO = withText ? LOGO_WITH_TEXT_ASPECT_RATIO : LOGO_ASPECT_RATIO;
  const adjustedHeight = width ? width / ASPECT_RATIO : height;
  const adjustedWidth = height ? height * ASPECT_RATIO : width;

  if (withText) {
    return (
      <Image
        src={LogoWithText}
        alt="trade manager logo"
        width={adjustedWidth}
        height={adjustedHeight}
      />
    );
  }

  return (
    <Image
      src={LogoSquare}
      alt="trade manager logo"
      width={adjustedWidth}
      height={adjustedHeight}
    />
  );
}

type Props = {
  width?: number;
  height?: number;
  withText?: boolean;
};
