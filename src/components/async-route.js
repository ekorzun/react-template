import {Route} from 'react-router-dom'
import {Spinner} from 'components/spinner'

export class AsyncRoute extends Component {
	state = {Component: null}

	onRender = (props) => {
		const {Component} = this.state
		return Component
			? <Component {...props} />
			: (this.props.render().then(({default: Component}) =>
				this.setState({Component})),
				<Spinner />
			)
	}

	render() {
		return <Route {...this.props}
			render={this.onRender} />
	}
}