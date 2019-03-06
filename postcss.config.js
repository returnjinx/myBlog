/**
 * Created by Administrator on 2016/12/19.
 */
module.exports = {
    plugins: [
        require('autoprefixer')({
            plugins: [
                require('autoprefixer')({
                    browsers:[
                        "last 2 versions",
                        "last 2 Chrome versions",
                        "> 5%",
                        "> 5% in US",
                        "ie 6-8",
                        "Firefox > 20",
                        "Firefox >= 20",
                        "Firefox < 20",
                        "Firefox <= 20",
                        "Firefox ESR",
                        "iOS 7",
                        "not ie <= 8", ]

                })
            ]
        })
    ]
}