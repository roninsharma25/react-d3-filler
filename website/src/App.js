import logo from './logo.svg';
import './App.css';
import Visualizations from './components/Visualizations';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Visualizations />
      </header>
    </div>
  );
}

export default App;
