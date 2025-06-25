import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = "685bdff8003600714594"
const USERS_COLLECTION_ID = "685be820001dd374ba64"


// Function to check if a session is active
const checkSession = async () => {
  try {
    const session = await account.getSession('current'); // 'current' gets the current session
    return session; // Return the active session
  } catch (error) {
    return null; // No active session
  }
};

export const registerUser = async (name,username, email, password) => {
  try {
    // Step 1: Create the user in Appwrite Auth
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Step 2: Add user data to the 'users' collection in the database
    const userDoc = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      user.$id, // Use same ID as Auth user for consistency
      {
        username,
        email,
        fullName:name,
        userId: user.$id, // Optional redundancy
      }
    );

    return { user, userDoc };
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};

export const loginWithEmailAndPass = async (email, password) => {
  const response = await account.createEmailPasswordSession(email, password);
  console.log('response',response);
  
  return response;
}


// Function to log out the user
export const logOutUser = async () => {
  const activeSession = await checkSession();
    console.log('checking session...');
    
  if (activeSession) {
    try {
      await account.deleteSession('current'); // Logs out the current session
      console.log('loggedout');
      
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
};