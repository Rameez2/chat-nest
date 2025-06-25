import { account, databases } from "@/lib/appwrite";

export const fetchCurrentUser = async () => {
    console.log('started');
    
  // GET CURRENT USER
  const currentUser = await account.get();
  const userId = currentUser.$id; // Authenticated user ID

  const response = await databases.listDocuments(
    "685bdff8003600714594",  // Database ID
    "685be820001dd374ba64", // Users Collection ID
    [Query.equal("userId", userId)] // Query by userId field
  );
  console.log('cuurent user,',response.documents);
  
  // Check if the user document exists
  if (response.documents.length === 0) {
    // throw new Error("User data not found in the database.");
    console.error("User data not found in the database.");

  }

  const userData = response.documents[0]; // Get the first document (should be unique)
  return userData;
}