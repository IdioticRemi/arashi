module.exports = class {
    constructor() {
        this.token = "YOUR BOOTIFUL TOKEN HERE";
        this.google_API = "YOUR BOOTIFUL YOUTUBE API KEY (FOR MUSIC SUPPORT)";
        this.arcadia = "YOUR BEAUTIFUL ARCADIA API KEY~";
        this.mongo = {
            connectionString: "IF YOU WISH TO USE THIS INSTEAD OF BASIC JSON PROVIDER JUST FILL IN THESE AND MODIFY tempest.js's DEFAULT PROVIDER",
            user: "",
            password: "",
            host: "",
            port: "",
            db: ""
        };
    }
};