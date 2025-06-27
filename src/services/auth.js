import { account, databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { fetchCurrentUser } from "./users";

// Function to check if a session is active
const checkSession = async () => {
  try {
    const session = await account.getSession('current'); // 'current' gets the current session
    return session; // Return the active session
  } catch (error) {
    return null; // No active session
  }
};

export const registerUser = async (name,username,age,gender, email, password) => {
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
      process.env.NEXT_PUBLIC_DB_ID,
      process.env.NEXT_PUBLIC_DB_USERS_ID,
      user.$id, // Use same ID as Auth user for consistency
      {
        username,
        email,
        fullName:name,
        age:age,
        gender:gender,
        userId: user.$id, // Optional redundancy
      }
    );
    const loginData = await loginWithEmailAndPass(email,password);

    return loginData;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};

export const loginWithEmailAndPass = async (email, password) => {
  const response = await account.createEmailPasswordSession(email, password);
  console.log('response',response);
  let currentUserData = await fetchCurrentUser();
  return currentUserData;
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