import { useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // 1. Removed 'address' from the state object
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 2. Sending only the remaining three fields to Supabase
    const { error } = await supabase
      .from('profiles')
      .insert([
        { 
          full_name: formData.full_name, 
          email: formData.email,
          phone: formData.phone 
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
        <h1>Request Sent!</h1>
        <p>Our ghostwriting team will reach out via phone or email.</p>
        <button onClick={() => setSubmitted(false)}>Back to Form</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'serif' }}>Ghost Writing Quote</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>FULL NAME</label>
          <input 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            type="text" 
            required 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>EMAIL ADDRESS</label>
          <input 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            type="email" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>PHONE NUMBER</label>
          <input 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            type="tel" 
            required 
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ background: '#000', color: '#fff', padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'SENDING...' : 'GET A QUOTE'}
        </button>
      </form>
    </div>
  );
}

export default App;