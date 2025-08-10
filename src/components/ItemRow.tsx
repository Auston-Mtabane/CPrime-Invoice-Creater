interface ItemRowProps {
  index: number;
  name: string;
  quantity: number;
  amount: number;
  subtotal: number;
  onDelete: (index: number) => void;
}

export function ItemRow({ index, name, quantity, amount, subtotal, onDelete }: ItemRowProps) {
  return (
    <div className="row-item">
      <p>{name}</p>
      <p>{quantity}</p>
      <p>{amount.toFixed(2)}</p>
      <p>{subtotal.toFixed(2)}</p>
      <div id="delete-btn" onClick={() => onDelete(index)}>
        <img src="/bin.svg" alt="bin" width={15} />
      </div>
    </div>
  );
}
