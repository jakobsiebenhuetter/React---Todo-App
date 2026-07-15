import './Header.css';



export default function Header() {
  return (
    <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <span>Icon</span>
            <div style={{marginLeft: '10px'}}>Flowlist</div>
        </div>
        <ul style={{ display: 'flex', listStyleType: 'none', marginRight: '10px' }}>
            <li style={{ marginRight: '10px' }}>
                <a href="#">Anmelden</a>
            </li>
            <li>
                <a href="#">Registrieren</a>
            </li>
        </ul>
    </header>
  );
}
