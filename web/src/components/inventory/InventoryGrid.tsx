import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import HotSlots from './HotSlots';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory, isLeftInventory?: boolean }> = ({ inventory, isLeftInventory }) => {
  const weight = useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  // Filter out the first 5 slots if this is the left inventory
  const displayItems = isLeftInventory
    ? inventory.items.filter(item => item.slot > 5)
    : inventory.items;

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);

  return (
    <>
      <div className={`inventory-container ${isLeftInventory ? 'with-hotslots' : ''}`}>
        {isLeftInventory && <HotSlots inventory={inventory} />}
        <div className="inventory-grid-wrapper" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
          <div className="inventory-grid-header-wrapper">
            <p>{inventory.label}</p>
          </div>
          <div className="inventory-grid-container" ref={containerRef}>
            <>
              {displayItems.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
                <InventorySlot
                  key={`${inventory.type}-${inventory.id}-${item.slot}`}
                  item={item}
                  ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                  inventoryType={inventory.type}
                  inventoryGroups={inventory.groups}
                  inventoryId={inventory.id}
                />
              ))}
            </>
          </div>
          <div className="weight-container">
            <div className='weight-text'>
              <p>WEIGHT</p>
              {inventory.maxWeight && (
                <p>
                  {weight / 1000}/{inventory.maxWeight / 1000}kg
                </p>
              )}
            </div>
            <div>
              <WeightBar percent={inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
