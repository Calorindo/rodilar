import { signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import { auth, db } from "@/lib/firebase";
import { UserData } from "@/types/user";

export const authService = {
  // Login
  async login(email: string, password: string): Promise<{ user: User; hasAccess: boolean }> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Verificar se o usuário tem acesso no Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) {
        await signOut(auth);
        throw new Error("Usuário não autorizado");
      }
      
      const userData = snapshot.val() as UserData;
      
      if (!userData.access) {
        await signOut(auth);
        throw new Error("Acesso negado");
      }
      
      return { user, hasAccess: true };
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },

  // Verificar se usuário tem acesso
  async checkUserAccess(uid: string): Promise<boolean> {
    try {
      const userRef = ref(db, `users/${uid}`);
      const snapshot = await get(userRef);
      
      if (!snapshot.exists()) return false;
      
      const userData = snapshot.val() as UserData;
      return userData.access === true;
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      return false;
    }
  },

  // Criar usuário admin (para uso interno)
  async createAdminUser(email: string, password: string): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Criar registro no Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        email: email,
        access: true,
        createdAt: new Date().toISOString()
      });
      
      return user.uid;
    } catch (error) {
      console.error("Erro ao criar usuário admin:", error);
      throw error;
    }
  }
};
