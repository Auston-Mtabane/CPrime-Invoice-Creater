import './App.css'
import FormSectionInvoice from './components/FormSectionInvoice'
function App() {

  return (
    <>
      <div id='container'>
        <div id="form-section">
          <p>form goes here</p>
          <FormSectionInvoice />
        </div>
        <div id="preview-section">
          <p>preview goes here</p>
        </div>
      </div>
      <button>
        Send Email
      </button>
    </>
  )
}

export default App
