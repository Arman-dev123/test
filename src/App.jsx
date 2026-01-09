import { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('profiles')
      .insert([
        { 
          full_name: formData.full_name, 
          email: formData.email,
          phone: formData.phone, 
          address: formData.address 
        }
      ]);

    setLoading(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'serif' }}>
        <h1>Thank You!</h1>
        <p>Your ghostwriting request has been received.</p>
        <button onClick={() => setSubmitted(false)}>Send Another</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2 style={{ textAlign: 'center' }}>Ghost Writing Quote</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          placeholder="Full Name" 
          required 
          onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
        />
        <input 
          type="email"
          placeholder="Email Address" 
          required 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          placeholder="Phone Number" 
          required 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
        />
        <textarea 
          placeholder="Briefly describe your project" 
          onChange={(e) => setFormData({...formData, address: e.target.value})} 
        />
        <button type="submit" disabled={loading} style={{ background: '#000', color: '#fff', padding: '10px' }}>
          {loading ? 'Sending...' : 'Get a Quote'}
        </button>
      </form>
    </div>
  );
}

export default App;