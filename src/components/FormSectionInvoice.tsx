
function FormSectionInvoice() {
  return (
    <>
    <p>Client Invoice/Quote</p>
    <form action="#" method="post">
        <label htmlFor="fname" >FullName:</label>
        <input type="name" placeholder="John Doe" id="fname" name="fname"/>

        <label htmlFor="femail" >Email:</label>
        <input type="email" placeholder="doejohn3@gmail.com" id="femail" name="femail"/><br />

        <label htmlFor="fphone">Mobile/Tel:</label>
        <input type="tel" placeholder="27 61 961 0499" id="fphone" name="fphone"/>

        <br /><input type="submit" value="preview"/>
    </form>
    </>

  );
}

export default FormSectionInvoice