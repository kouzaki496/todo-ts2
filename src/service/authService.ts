import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

// Googleプロバイダーのインスタンスを作成
const provider = new GoogleAuthProvider();

// Googleでサインインする関数
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // サインイン成功時のユーザー情報
    const user = result.user;
    console.log('User Info:', user);
    return user;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};