const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteStorageId: String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionIdSkill: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_SKILL),
    appwriteStorageIdSkill: String(import.meta.env.VITE_APPWRITE_STORAGE_ID_SKILL),
}

export default conf