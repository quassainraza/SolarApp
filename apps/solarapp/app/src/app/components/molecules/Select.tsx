import React from 'react';
import {
  ChevronDownIcon,
  Icon,
  Select as GlSelect,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed';

const Select = () => {
  return (
    <GlSelect>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="UX Research" value="ux" />
          <SelectItem label="Web Development" value="web" />
          <SelectItem
            label="Cross Platform Development Process"
            value="Cross Platform Development Process"
          />
          <SelectItem label="UI Designing" value="ui" isDisabled={true} />
          <SelectItem label="Backend Development" value="backend" />
        </SelectContent>
      </SelectPortal>
    </GlSelect>
  );
};

export default Select;
