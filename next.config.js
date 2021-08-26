module.exports = {
    resolve: {
        fallback: {
            "fs": false
        },
    },
    env: {
        mongoUrl: "mongodb+srv://umid:12345@cluster0.syzis.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        jwtSecret: "Umidjon2231",
        storageName: "userData"
    }

}
