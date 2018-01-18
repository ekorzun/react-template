import {Link} from 'react-router-dom'

export const Nav = () =>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/not-found">Not Found</Link>
	</nav>