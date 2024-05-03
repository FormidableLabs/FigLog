import { ChangeLog, ChangeLogState } from '../../types/ChangeLog';
import { Button } from '../Button';
import { COLOR, FONT } from '../../utilities/Styles';

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface AddLinkProps {
  changeLog: ChangeLog;
  updateChangeState: (changes: Partial<ChangeLogState>) => void;
}

export const AddLink = ({ changeLog, updateChangeState }: AddLinkProps) => {
  return (
    <AutoLayout width="fill-parent" horizontalAlignItems="end" verticalAlignItems="center">
      {(changeLog.links?.length || 0) + (changeLog.state?.updates?.links?.length || 0) > 7 ? (
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
          action={() => {
            updateChangeState({
              ...changeLog.state,
              showLinkForm: true,
            });
          }}
        />
      )}
    </AutoLayout>
  );
};
