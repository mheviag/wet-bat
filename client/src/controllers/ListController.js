import Config from './Config';

class ListController {
    constructor() {
        this.config = new Config();
    }

    async getAirports(){
        try {
            const response = await fetch(this.config.url + "airports", {
                method: "GET",
                headers: {"Content-Type":"application/json"}
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async getTransportations(){
        try {
            const response = await fetch(this.config.url + "transportations", {
                method: "GET",
                headers: {"Content-Type":"application/json"}
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default ListController;