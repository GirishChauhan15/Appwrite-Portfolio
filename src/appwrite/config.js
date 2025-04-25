import { Client, Databases, Storage, Account,ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  account;
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createProject(
    {slug, title, image, content, viewProject, viewCode, userID }
  ) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          image,
          content,
          viewProject,
          viewCode,
          userID,
        }
      );
    } catch (error) {
      throw error
    }
  }
  async getProjects() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      return false;
    }
  }
  async getProject(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      return false
    }
  }
  async updateProject(slug, 
    {title, image, content, viewProject, viewCode}
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          image,
          content,
          viewProject,
          viewCode,
        }
      )
    } catch (error) {
      return false
    }
  }
  async deleteProject(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      return false
    }
  }
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteStorageId,
        ID.unique(),
        file
      )
    } catch (error) {
      return false
    }
  }
  async deleteFile(image) {
    try {
      await this.storage.deleteFile(
        conf.appwriteStorageId,
        image
      )
      return true
    } catch (error) {
      return false
    }
  }
  getFilePreview(image) {
    try {
      return this.storage.getFileView(
        conf.appwriteStorageId,
        image
      )
    } catch (error) {
      return false
    }
  }



  async createSkill({
    userID,
    info,
    icon,
    exp,
    slug
  }){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdSkill,
        slug,
        {
          userID,
          info,
          icon,
          exp
        }
      )
    } catch (error) {
      throw error
    }
  }

  async updateSkill(slug,{
info,
icon,
exp
  }){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdSkill,
        slug,
        {
          info,
          icon,
          exp
        }
      )
    } catch (error) {
      return false
    }
  }

  async deleteSkill(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdSkill,
        slug
      )
      return true
    } catch (error) {
      return false
    }
  }

  async getSkill(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdSkill,
        slug
      )
    } catch (error) {
      return false
    }
  }
  async getSkills(){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdSkill
      )
    } catch (error) {
      return false
      
    }
  }

  async createIcon(file){
    try {
      return await this.storage.createFile(
        conf.appwriteStorageIdSkill,
        ID.unique(),
        file
      )
    } catch (error) {
      return false
    }
  }
  async deleteIcon(file) {
    try {
      await this.storage.deleteFile(
        conf.appwriteStorageIdSkill,
        file
      )
      return true
    } catch (error) {
      return false
    }
  }

  getSkillFile(file){
    try {
      return this.storage.getFileDownload(
        conf.appwriteStorageIdSkill,
        file
      )
    } catch (error) {
      return false
    }
  }
}

const service = new Service();

export default service;
