let watch = false
let instances = 1
let exec_mode = 'fork'

module.exports = {
    apps: [
        {
            name: 'esima',
            cwd: '/home/ainulyaqin/dev/esima',
            script: './server.js',
            exp_backoff_restart_delay: 100,
            instances,
            exec_mode,
            max_memory_restart: '1G',
            autorestart: true,
            env: {
                Z: 'Asia/Jakarta',
                NAMESPACE: 'esima',
                APPID: 4,
                PORT: 3007,
                VERSION: '1.0.0',
                NODE_ENV: 'development',
                DEBUG: "esima:*,queries:*"
            }
        }
    ]
}
