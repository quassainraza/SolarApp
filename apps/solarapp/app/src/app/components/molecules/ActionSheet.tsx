import React, { Dispatch, SetStateAction } from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@gluestack-ui/themed';

interface Props {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  children?: JSX.Element | JSX.Element[];
}

const ActionSheet = ({ isOpen, setIsOpen, children }: Props) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
          {children}
        </ActionsheetDragIndicatorWrapper>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default ActionSheet;
