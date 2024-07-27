import { SVGProps } from 'react';
import IconLayout from './IconLayout';

type Props = {
  SVGAttributes?: SVGProps<SVGPathElement>;
};

export default function NextArrowIcon({ SVGAttributes }: Props) {
  return (
    <IconLayout>
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.64645 0.853553C7.45118 0.658291 7.45118 0.341709 7.64645 0.146447C7.84171 -0.0488155 8.15829 -0.0488155 8.35355 0.146447L11.7828 3.57574C11.7953 3.58822 11.8071 3.60112 11.8183 3.61439C11.9293 3.7061 12 3.84479 12 4C12 4.15521 11.9293 4.2939 11.8183 4.38561C11.8071 4.39888 11.7953 4.41178 11.7828 4.42426L8.35355 7.85355C8.15829 8.04881 7.84171 8.04881 7.64645 7.85355C7.45118 7.65829 7.45118 7.34171 7.64645 7.14645L10.2929 4.5H0.5C0.223858 4.5 0 4.27614 0 4C0 3.72386 0.223858 3.5 0.5 3.5H10.2929L7.64645 0.853553Z"
          fill="white"
          {...SVGAttributes}
        />
      </svg>
    </IconLayout>
  );
}
