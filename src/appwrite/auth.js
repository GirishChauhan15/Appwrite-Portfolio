import { Client, Account } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            throw error
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions() 
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
    }
    return null;
    }
}

const service = new Service();

export default service