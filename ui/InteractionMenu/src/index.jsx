import './index.css'
import { hydrate } from 'react-dom'
import Menu from './components/MenuSlider'

hydrate(
    <Menu />,        
    document.getElementById('root')
)