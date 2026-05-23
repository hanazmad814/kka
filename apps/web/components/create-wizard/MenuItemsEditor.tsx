import type { RestaurantMenuItemInput } from './create-wizard.types';

export function MenuItemsEditor({ items, onChange }: { items: RestaurantMenuItemInput[]; onChange: (items: RestaurantMenuItemInput[]) => void }) {
  return <div>{items.map((item, index) => <div key={item.id}>
    <input value={item.name} placeholder='Item name' onChange={(e: { target: { value: string } }) => onChange(items.map((x, i) => i === index ? { ...x, name: e.target.value } : x))} />
    <button onClick={() => onChange(items.filter((_, i) => i !== index))}>Remove</button>
  </div>)}</div>;
}
