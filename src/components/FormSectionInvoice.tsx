
function FormSectionInvoice() {
  return (
    <>
    <p>Client Details</p>
    <form action="#" method="post">
        <div className="rounded-div" id="client-details">
            <label htmlFor="fname" >FullName:</label>
            <input type="name" placeholder="John Doe" id="fname" name="fname"/>

            <label htmlFor="femail" >Email:</label>
            <input type="email" placeholder="doejohn3@gmail.com" id="femail" name="femail"/><br />

            <label htmlFor="fphone">Mobile/Tel:</label>
            <input type="tel" placeholder="27 61 961 0499" id="fphone" name="fphone"/>
        </div>
        <p>Invoice/Quote Items</p>
        <div className="rounded-div">
            <div>
                <div className="row-item">
                   <p>Item Name/Description</p>
                   <p>Quantity</p>
                   <p>Amount (R)</p>
                   <p>Sub Total</p>
                </div>
                <br />
                <div className="row-item">
                    <input type="text" placeholder="Item" name="item-name" />
                    <input type="number" placeholder="0" name="item-quantity" />
                    <input type="number" placeholder="0.00" name="item-amount" />
                    <input type="number" placeholder="0.00" name="item-subtotal" />
                </div>
                
            </div>
            <button >Add Item (+)</button>
        </div>

        <br /><input type="submit" value="preview"/>
    </form>
    </>

  );
}

export default FormSectionInvoice