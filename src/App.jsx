import { useState } from 'react';
import { supabase } from './supabaseClient';
import { CheckCircle2, Send } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '' // Kept as requested in your column list
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
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF9F6', fontFamily: 'serif' }}>
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <CheckCircle2 size={60} color="#C5A059" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '2rem', color: '#0f172a' }}>Request Received</h2>
          <p style={{ color: '#64748b' }}>Our ghostwriting experts will contact you shortly.</p>
          <button onClick={() => setSubmitted(false)} style={{ marginTop: '20px', background: 'none', border: '1px solid #C5A059', color: '#C5A059', padding: '10px 20px', cursor: 'pointer' }}>Send another request</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF9F6', padding: '80px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>Ghost Writing</h1>
          <p style={{ color: '#C5A059', fontWeight: 'bold', letterSpacing: '2px', fontSize: '12px', uppercase: 'true' }}>REQUEST A CONSULTATION</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>FULL NAME</label>
            <input 
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '10px 0', outline: 'none', fontSize: '16px' }}
              type="text" 
              required 
              onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>EMAIL ADDRESS</label>
            <input 
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '10px 0', outline: 'none', fontSize: '16px' }}
              type="email" 
              required 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>PHONE NUMBER</label>
            <input 
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '10px 0', outline: 'none', fontSize: '16px' }}
              type="tel" 
              required 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>ADDITIONAL NOTES / ADDRESS</label>
            <textarea 
              style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '10px 0', outline: 'none', fontSize: '16px', resize: 'none' }}
              rows="2"
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#0f172a', 
              color: 'white', 
              border: 'none', 
              fontWeight: 'bold', 
              letterSpacing: '2px', 
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {loading ? 'SENDING...' : 'GET A QUOTE'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;