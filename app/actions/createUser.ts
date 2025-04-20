'use server';
import { createAdminClient } from '@/config/appwrite';
import { ID } from 'node-appwrite';

const createUser = async (previousState: unknown, formData: FormData) => {
  //--------------- Variables -----------------

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;
  const userId = ID.unique();

  //--------------- Fonctions-----------------

  if (!name || !email || !password) {
    return { success: false, error: 'Veuillez remplir tous les champs' };
  } else if (password.length < 8) {
    return {
      success: false,
      error: 'Le mot de passe doit contenir au moins 8 caractères',
    };
  } else if (password !== confirmPassword) {
    return {
      success: false,
      error: 'Les mots de passe ne correspondent pas',
    };
  } else {
    const { account } = await createAdminClient();
    try {
      // CREATE USER
      await account.create(userId, email, password, name);
      return { success: true };
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return {
        success: false,
        error: "Erreur lors de la création de l'utilisateur",
      };
    }
  }
};

export default createUser;
