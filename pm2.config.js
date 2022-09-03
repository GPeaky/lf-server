module.exports = {
	apps: [
		{
			name: 'Life Experience',
			script: 'ragemp-server.exe',
			watch: ['ragemp-server.exe', './packages/*/**'],

			restart: true
		}
	]
}
