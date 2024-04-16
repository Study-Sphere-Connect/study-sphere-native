import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Adapt, Select, Sheet, YStack } from 'tamagui';

const items = [
    { name: 'All' },
    { name: 'Pending' },
    { name: 'Accepted' },
    { name: 'Rejected' },
];

const MeetupFilter = () => {
  const [selectedItem, setSelectedItem] = useState('All');

  const handleItemChange = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Select value={selectedItem} onValueChange={handleItemChange}>
      <Select.Trigger width={'100%'} iconAfter={ChevronDown}>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>
        <Select.Viewport>
          <Select.Group>
            {items.map((item, index) => (
              <Select.Item
                key={index}
                value={item.name}
                index={index}
              >
                <Select.ItemText>{item.name}</Select.ItemText>
                {selectedItem === item.name && (
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                )}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};

export default MeetupFilter;
