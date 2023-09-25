const { widget } = figma;
const {
  AutoLayout,
  SVG,
  Text
} = widget;

export const ChangeLogEmpty = () => (
  <AutoLayout
    name="Changelog"
    overflow="visible"
    direction="vertical"
    padding={{
      vertical: 8,
      horizontal: 0,
    }}
    width={752}
  >
    {}
    <AutoLayout
      name="Empty"
      fill="#FFF"
      overflow="visible"
      direction="vertical"
      spacing={8}
      padding={{
        vertical: 64,
        horizontal: 0,
      }}
      width="fill-parent"
      horizontalAlignItems="center"
    >
      <Text
        name="No changes found in this log. Add your first change here"
        fill="#191919"
        lineHeight={16}
        fontFamily="IBM Plex Sans"
        fontSize={12}
        letterSpacing={0.48}
        textCase="upper"
      >
        no changes found in log. add your first change here
      </Text>
      <SVG
        name="Arrow 1"
        x={572.5}
        y={-5.043}
        positioning="absolute"
        height={108}
        width={169}
        src="<svg width='170' height='110' viewBox='0 0 170 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M158.949 8.68377C158.774 8.15983 158.208 7.87667 157.684 8.05131L149.146 10.8974C148.622 11.072 148.339 11.6383 148.513 12.1623C148.688 12.6862 149.254 12.9694 149.778 12.7947L157.368 10.2649L159.897 17.8544C160.072 18.3783 160.638 18.6615 161.162 18.4868C161.686 18.3122 161.969 17.7459 161.795 17.2219L158.949 8.68377ZM0.500061 79.5C11.1992 79.5 29.8985 80.2414 49.5702 78.8585C69.2241 77.4768 90.0418 73.967 104.999 65.3669L104.002 63.6331C89.4583 71.9955 69.026 75.4857 49.4299 76.8634C29.8516 78.2398 11.3009 77.5 0.500061 77.5L0.500061 79.5ZM104.999 65.3669C134.685 48.297 148.316 30.6051 158.894 9.44721L157.106 8.55278C146.685 29.3949 133.315 46.778 104.002 63.6331L104.999 65.3669Z' fill='#D9D9D9'/>
</svg>
"
      />
    </AutoLayout>
  </AutoLayout>
);
