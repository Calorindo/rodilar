import { ref, get, set, remove, update } from "firebase/database";
import { createUserWithEmailAndPassword, deleteUser as deleteAuthUser } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { UserData } from "@/types/user";

const USERS_PATH = "users";

export const userService = {
  // Buscar todos os usuários
  async getAll(): Promise<(UserData & { uid: string })[]> {
    try {
      const usersRef = ref(db, USERS_PATH);
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(uid => ({
          uid,
          ...data[uid]
        }));
      }
      return [];
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  // Criar novo usuário
  async create(email: string, password: string, access: boolean): Promise<string> {
    try {
      // Criar no Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Criar registro no Realtime Database
      const userRef = ref(db, `${USERS_PATH}/${user.uid}`);
      await set(userRef, {
        email: email,
        access: access,
        createdAt: new Date().toISOString()
      });
      
      return user.uid;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  // Atualizar acesso do usuário
  async updateAccess(uid: string, access: boolean): Promise<void> {
    try {
      const userRef = ref(db, `${USERS_PATH}/${uid}`);
      await update(userRef, { access });
    } catch (error) {
      console.error("Erro ao atualizar acesso:", error);
      throw error;
    }
  },

  // Deletar usuário
  async delete(uid: string): Promise<void> {
    try {
      // Remover do Realtime Database
      const userRef = ref(db, `${USERS_PATH}/${uid}`);
      await remove(userRef);
      
      // Nota: Não é possível deletar do Authentication sem estar logado como esse usuário
      // ou usar Firebase Admin SDK no backend
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }
};
