import React from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';

const sample = [
  {id:'1', title:'The Great Escape', poster:'https://picsum.photos/seed/1/800/1200', description:'An epic escape film.', year:1963, tags:['Adventure','Classic']},
  {id:'2', title:'Sci-Fi Epic', poster:'https://picsum.photos/seed/2/800/1200', description:'Futuristic tale.', year:2021, tags:['Sci-Fi','Action']},
  {id:'3', title:'Romantic Comedy', poster:'https://picsum.photos/seed/3/800/1200', description:'Hearts collide.', year:2019, tags:['Romance','Comedy']},
];

export default function App(){
  const [movies, setMovies] = React.useState(sample);
  const [showAdd, setShowAdd] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(true);

  const filtered = movies.filter(m=> m.title.toLowerCase().includes(query.toLowerCase()) || (m.tags||[]).join(' ').toLowerCase().includes(query.toLowerCase()));

  const handleAdd = (m:any)=> setMovies(prev=>[m,...prev]);
  const handleDownload = (m:any)=> alert('Pretend download started for '+m.title);

  return (
    <div className="container">
      <Header onOpenAdd={()=>setShowAdd(true)} onSearch={(q)=>setQuery(q)} />
      {showAdd && <div style={{marginTop:12}}><AddMovieForm onAdd={handleAdd} onClose={()=>setShowAdd(false)} /></div>}
      <div style={{display:'flex',gap:12,alignItems:'center',marginTop:12}}>
        <div style={{flex:1}}>
          <MovieList movies={filtered} onDownload={handleDownload} />
        </div>
        <aside style={{width:320}}>
          <div className="admin-panel card">
            <h4 style={{marginTop:0}}>Admin Panel</h4>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              <label style={{fontSize:13,color:'#94a3b8'}}>Telegram Sync</label>
              <div style={{display:'flex',gap:8}}>
                <button className="btn ghost small" onClick={()=>alert('Setup Telegram webhook - implement server side')}>Connect</button>
                <button className="btn small" onClick={()=>alert('Syncing now...')}>Sync Now</button>
              </div>
              <hr style={{border:'none',height:1,background:'rgba(255,255,255,0.03)',margin:'8px 0'}} />
              <label style={{fontSize:13,color:'#94a3b8'}}>Site Settings</label>
              <div style={{display:'flex',gap:8}}>
                <button className="btn ghost small" onClick={()=>setIsAdmin(!isAdmin)}>{isAdmin? 'Disable Admin':'Enable Admin'}</button>
              </div>
              <div style={{fontSize:13,color:'#94a3b8',marginTop:8}}>
                Tip: To auto-add movies from your Telegram channel, configure a server-side webhook that posts new movies to this app's admin API.
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="footer">MovieFlix • Built with care • © {new Date().getFullYear()}</div>
    </div>
  )
}