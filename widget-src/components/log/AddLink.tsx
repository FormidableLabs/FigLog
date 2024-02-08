import { ChangeLog } from '../../types/ChangeLog';
import { Button } from '../Button';
import { COLOR, FONT } from '../../utilities/Styles';
import { ActionLinkIcon } from '../../svgs/ActionLinkIcon';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface AddLinkProps {
  changeLog: ChangeLog;
  updateChange: (changes: Partial<ChangeLog>) => void;
}

export const AddLink = ({
  changeLog,
  updateChange,
}: AddLinkProps) => {
  return (
    <AutoLayout
      width="fill-parent"
      horizontalAlignItems="end"
      verticalAlignItems="center"
    >
      {changeLog.links && changeLog.links.length > 7 ? (
        <Text
          fill={COLOR.greyDark}
          lineHeight={FONT.lineHeight.xs}
          fontFamily={FONT.family}
          fontSize={FONT.size.xs}
          letterSpacing={FONT.letterSpacing.sm}
          fontWeight={FONT.weight.regular}
        >
          Link maximum (8) reached.
        </Text>
      ) : (
        <Button
          label="Add Link"
          iconSrc={<ActionLinkIcon color={COLOR.greyDark} />}
          action={() => {
            updateChange({
              state: {
                ...changeLog.state,
                showLinkForm: true,
              }
            })
          }}
        />
      )}
    </AutoLayout>
  )
}