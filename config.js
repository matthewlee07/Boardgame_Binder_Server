exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    // 'localhost:8080/'    
    global.DATABASE_URL
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'password';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';