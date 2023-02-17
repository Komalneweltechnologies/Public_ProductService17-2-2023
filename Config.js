var environmentConfig = {
    local: {
        service_port: 1339,
        ui_url: 'http://localhost:4200/',       
        dbConn: {
            dbServer: 'localhost',
            dbName: 'products',
            dbUser: 'root',
            dbPassword: 'root'
        }
    }
    
}

var environment = 'local';

const finalConfig = environmentConfig[environment];

module.exports.service_port = finalConfig.service_port;
module.exports.ui_url = finalConfig.ui_url;
module.exports.group_mail = finalConfig.group_mail;
module.exports.emailConfig = finalConfig.emailConfig;
module.exports.dbConn = finalConfig.dbConn;