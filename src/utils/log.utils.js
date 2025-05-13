let logger = {
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            }
        },
        serializers: {
            req(req) {
                return {
                    method: req.method,
                    url: req.url,
                    headers: req.headers,
                    hostname: req.hostname,
                    remoteAddress: req.ip,
                    remotePort: req.socket.remotePort
                };
            },
            res(res) {
                return {
                    statusCode: res.statusCode
                };
            }
        }
    }
}

export default logger