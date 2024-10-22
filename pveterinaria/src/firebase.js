import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import { supabase } from "./supabaseClient";

const firebaseConfig = {
  apiKey: "AIzaSyDNOE_BKFZl4zjBq98t3adrLEfIGuVxH6I",
  authDomain: "la-casa-del-marisco-web.firebaseapp.com",
  projectId: "la-casa-del-marisco-web",
  storageBucket: "la-casa-del-marisco-web.appspot.com",
  messagingSenderId: "23799570869",
  appId: "1:23799570869:web:80564ce48501677fed79fc",
  measurementId: "G-CD4CYZ9HLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFilesUsuarios(File) {
  let fileUrl = null;

  // Función para cargar la imagen
  const uploadImage = async () => {
    let file = File;
    let filePath = `${Date.now()}_${file.name}`;

    try {
      const { error } = await supabase.storage
        .from('LCDM')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('LCDM')
        .getPublicUrl(filePath);

      if (publicUrlError) {
        throw publicUrlError;
      }

      fileUrl = publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen: ' + error.message);
    }
  };

  // Llama a la función de carga de imagen al iniciar la función uploadFilesUsuarios
  await uploadImage(File);

  // Retorna el URL de la imagen
  return fileUrl;
}

export const uploadFilesProductos = async (File) => {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, File);
  const url = await getDownloadURL(storageRef);
  return url;
};
