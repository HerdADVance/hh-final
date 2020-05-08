import cookie from 'js-cookie'
import { navigate } from "@reach/router"


export function handleLogin(token) {
	cookie.set('hh-token', token)
	navigate(`/`)
}

export function handleLogout() {
	cookie.remove('hh-token')
	navigate('/login')
}