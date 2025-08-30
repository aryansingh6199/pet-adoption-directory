// src/App.jsx
import ContactForm from "./ContactForm";
import "./App.css"; // optional if you want styles

function App() {
  return (
    <div className="app-container">
      <h1>🐾 Pet Adoption Directory</h1>
      <p>Fill out the form below to adopt your new best friend!</p>
      <ContactForm />
    </div>
  );
}

export default App;
