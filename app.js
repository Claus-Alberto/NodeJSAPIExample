const express = require('express')

const app = express()

app.use(express.json())

app.get("/api/v1/", (req, res) => {
    let m = parseInt(req.query.initial)
    let n = parseInt(req.query.final)

    switch (req.query.method) {
        case 'recursivo':
            return res.json({
                'method': req.query.method,
                'product': recursivo(m, n, 1)
            })
        case 'iterativo':
            return res.json({
                'method': req.query.method,
                'product': iterativo(m, n)
            })
        default:
            return res.json({
                'error': 'Método não reconhecido!',
                'method': req.query.method
            })
    }
})

function iterativo(m, n) {
    let result = 1;

    for (let i = m; i <= n; i++) {
        result *= (i + (1 / i))
    }

    return result
}

function recursivo(m, n, value) {
    if (m <= n) {
        value *= (m + (1 / m))
        m++
        return recursivo(m, n, value)
    }

    return value
}

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
});