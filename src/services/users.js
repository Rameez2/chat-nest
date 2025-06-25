import { account, databases } from "@/lib/appwrite";
import { Query } from "appwrite";

export const fetchCurrentUser = async () => {
    console.log('started');
    
  // GET CURRENT USER
  const currentUser = await account.get();
  const userId = currentUser.$id; // Authenticated user ID
    
  const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DB_ID,  // Database ID
      process.env.NEXT_PUBLIC_DB_USERS_ID, // Users Collection ID
    [Query.equal("userId", userId)] // Query by userId field
  );
  
  // Check if the user document exists
  if (response.documents.length === 0) {
      // throw new Error("User data not found in the database.");
      console.error("User data not found in the database.");
    }
    
    console.log('cuurent user,',response.documents[0]);

    const userData = response.documents[0]; // Get the first document (should be unique)
    return userData;
}