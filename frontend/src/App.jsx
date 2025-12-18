import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, Gamepad2, Film } from 'lucide-react';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/data', { method: "GET", credentials: 'include' });
        const data = await res.json();
        
        setTimeout(() => {
          setUserData(data);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 font-light tracking-widest animate-pulse">LOADING</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 antialiased">
      <div className="w-full max-w-md text-center">
        {/* Header / Avatar */}
        <header className="mb-12">
          <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 font-light text-xl tracking-widest">
            {userData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
            {userData.name}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">
            Developer & Creator
          </p>
        </header>

        {/* Interests Section */}
        <section className="mb-16">
          <div className="flex flex-wrap justify-center gap-2">
            {userData.interest.map((interest, index) => (
              <span 
                key={index} 
                className="px-4 py-1.5 text-[11px] font-medium border border-gray-100 rounded-full text-gray-500 bg-white hover:border-gray-900 hover:text-gray-900 transition-all duration-300 cursor-default"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Social & Footer */}
        <footer>
          <div className="flex justify-center space-x-10 mb-12">
            <a href={userData.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-black transition-colors duration-300">
              <Github size={20} strokeWidth={1.2} />
            </a>
            <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-black transition-colors duration-300">
              <Linkedin size={20} strokeWidth={1.2} />
            </a>
            <a href={`mailto:${userData.email}`} className="text-gray-300 hover:text-black transition-colors duration-300">
              <Mail size={20} strokeWidth={1.2} />
            </a>
          </div>
          
          <div className="pt-8 border-t border-gray-50">
            <a 
              href={`mailto:${userData.email}`} 
              className="text-[10px] tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors uppercase font-semibold"
            >
              Get in touch
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;