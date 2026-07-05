import './Header.css';


const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
colors.map(() => randomColor());
function randomColor() {
    //...
}





export default function Header() {
  return (
    <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <span>Icon</span>
            <div style={{marginLeft: '10px'}}>Flowlist</div>
        </div>
         <h1>Hallo Welt, ich wurde mit React erstellt :-)!</h1>
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
