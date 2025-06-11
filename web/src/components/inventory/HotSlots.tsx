import React from 'react';
import { Inventory } from '../../typings';
import InventorySlot from './InventorySlot';
import { useAppSelector } from '../../store';

const HotSlots: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  // Get only the first 5 slots
  const hotSlotItems = inventory.items.filter((item) => item.slot <= 5);

  return (
    <div className="hot-slots-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
      <div className="hot-slots-container">
        {hotSlotItems.map((item) => (
          <InventorySlot
            key={`${inventory.type}-${inventory.id}-${item.slot}-hot`}
            item={item}
            inventoryType={inventory.type}
            inventoryGroups={inventory.groups}
            inventoryId={inventory.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HotSlots;
