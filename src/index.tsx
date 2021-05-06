import { render } from 'preact';
import 'preact/devtools';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root) {
  render(<App />, root);
}
