import Config from '../controllers/Config';

class QuoteController {
    constructor() {
        this.config = new Config();
    }

    async addQuote(data){
        try {
            const body = data;
            const response = await fetch(this.config.url + "quotes", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async getQuotes(){
        try {
            const response = await fetch(this.config.url + "quotes", {
                method: "GET",
                headers: {"Content-Type":"application/json"}
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async getQuote(id){
        try {
            const response = await fetch(this.config.url + "quotes/" + id, {
                method: "GET",
                headers: {"Content-Type":"application/json"}
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateQuote(data){
        try {
            const body = data;
            const response = await fetch(this.config.url + "quotes/" + data.id, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateQuoteStatus(data){
        try {
            const body = data;
            const response = await fetch(this.config.url + "quotes/status/" + data.id, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteQuote(id){
        try {
            const response = await fetch(this.config.url + "quotes/" + id, {
                method: "DELETE",
                headers: {"Content-Type":"application/json"}
            });
            return(response.json());
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default QuoteController;