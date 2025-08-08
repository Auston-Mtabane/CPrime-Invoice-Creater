
function FormSectionInvoice() {
  return (
    <>
    <p>Client Details</p>
    <form action="#" method="post">
        <div className="rounded-div">
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
                <p>Item Name/Description   Quantity   Amount (R)  Sub Total</p>
                
                <br />
                <input type="email" placeholder="doejohn3@gmail.com" id="femail" name="femail"/>
                <input type="tel" placeholder="27 61 961 0499" id="fphone" name="fphone"/>
                <input type="tel" placeholder="27 61 961 0499" id="fphone" name="fphone"/>
                <input type="tel" placeholder="27 61 961 0499" id="fphone" name="fphone"/>
            </div>
            <button >Add Item (+)</button>
        </div>

        <br /><input type="submit" value="preview"/>
    </form>
    </>

  );
}

export default FormSectionInvoice