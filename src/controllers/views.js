import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {AsyncRoute} from 'components/async-route'
import {Nav} from 'components/nav'
import HomeView from 'views/home'

export class ViewsController extends Component {
	render() {
		return <BrowserRouter>
			<div>
				<Nav />
				<Switch>
					<Route exact path="/" component={HomeView} />
					<AsyncRoute render={() => import('views/not-found')} />
				</Switch>
			</div>
		</BrowserRouter>
	}
}