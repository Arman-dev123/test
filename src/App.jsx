import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    // This sends data to the 'profiles' table we just created
    const { error } = await supabase
      .from('profiles')
      .insert([
        { 
          full_name: formData.full_name, 
          phone: formData.phone, 
          address: formData.address,
          user_id: session.user.id // Links the record to the logged-in user
        }
      ]);

    setLoading(false);
    if (error) alert(error.message);
    else alert('Details saved to database!');
  };

  if (!session) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Please Login First</h1>
        <p>Use the login logic from the previous step to get a session.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>User Details Form</h2>
      <form onSubmit={handleSubmitDetails} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Full Name" 
          onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Phone Number" 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
        />
        <textarea 
          placeholder="Address" 
          onChange={(e) => setFormData({...formData, address: e.target.value})} 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Details'}
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default App;