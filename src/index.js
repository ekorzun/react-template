import {render} from 'react-dom'
import {ViewsController} from 'controllers/views'

console.info(`version ${__VERSION__}`)
const renderApp = () => render(
	<ViewsController />,
	document.getElementById('root')
)

renderApp()
if (module.hot) module.hot.accept('controllers/views', renderApp)