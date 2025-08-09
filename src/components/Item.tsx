interface ItemProps {
    index: number;
    name: string;
    quantity: number;
    amount: number;
    subtotal: number;
}
function Item({index,name,quantity,amount,subtotal}: ItemProps) {
    return (
        <div className="item">
            <div className="row-item">
                <p>{name}</p>
                <p>{quantity}</p>
                <p>{amount.toFixed(2)}</p>
                <p>{subtotal.toFixed(2)}</p>
                <div id="delete-btn" onClick={() => console.log(`Remove item at index ${index}`)}>
                    <img src='/public/bin.svg' alt="bin" width={15}/>
                </div>


            </div>
        </div>


    );
}

export default Item;