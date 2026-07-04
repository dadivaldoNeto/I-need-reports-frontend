import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import './css/index.css';

import { loginView } from './pages/login';


var item = document.querySelector("#app")!;
item.innerHTML += loginView()
