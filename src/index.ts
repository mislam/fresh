import 'dotenv/config'

process.on('SIGINT', () => {
	console.log('\nGracefully shutting down')
	process.exit(0)
})

function main() {
	try {
		console.log('🎉 Party time! Your app is ready to rock!\n')
		console.log('👉 Edit \x1b[38;5;208msrc/index.ts\x1b[0m and watch the magic happen here!')
		console.log('   Lets build something amazing!\n')
		console.log('❤️ Loving TypeZero so far?')
		console.log('   Drop us a ⭐ on GitHub: \x1b[33mhttps://github.com/mislam/typezero\x1b[0m\n')
	} catch (error) {
		console.error('Failed to start:', error)
		process.exit(1)
	}
}

main()
