const jsonServer = require('json-server')
const path = require('path')
const cors = require('cors')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'database/db.json'))
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const db = router.db
const port = 3333

let corsOptions = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', true)
    next()
}

class ServerClass {
    init() {
        server.use(corsOptions)
        server.use(bodyParser.json({ limit: '10mb' }))
        server.use(bodyParser.urlencoded({ extended: true }))
        server.use(cookieParser('put_key_here'))
        this.AppRoutes()
    }

    AppRoutes() {
        server.post('/login', (req, res) => {
            console.log(req.body)
            if(typeof req.body === "undefined" || !req.body){
                res.status(500).json({
                    ok : false,
                    status: 500,
                    message : 'Body data is empty',
                    error : 'Body data is empty',
                    data : null        
                })
            } else {
                const user = db.get("users")
                    .find({email: req.body.email})
                    .value()
                if(user.password === req.body.password){
                    res.cookie("auth_cookie", jwt.sign({email: user.email },'put_key_here',{ expiresIn: 86400000  }), { maxAge: 86400000})
                    res.status(200).json({
                        ok : false,
                        status: 200,
                        message : 'Login OK',
                        error : null,
                        data : null        
                    })
                } else {
                    res.status(404)
                }
            }
        })

        server.get('/me', (req, res) => {
            let token = null
            if (!req && !req.cookies) {
                res.status(403)  
            } 
            token = req.cookies["auth_cookie"]
            const decode = jwt.verify(token, 'put_key_here')

            if(token !== null && decode.exp*1000 > Date.now()){
                console.log('ok')
                const user = db.get("users")
                    .find({email: decode.email})
                    .value()
                res.status(200).json({
                    ok : false,
                    status: 200,
                    message : 'Auth validate',
                    error : null,
                    data : user        
                })
            } else {
                res.status(403)
            }
        })

        server.use(router)

        this.launch()
    }

    launch() {
        server.listen(port, () => console.log(`App is running on port http://localhost:${port}/`))
    };
}

new ServerClass().init();