import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
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

export async function uploadFilesUsuarios (File) {
  // Declaración de variables de estado
  let uploading = false;
  let fileUrl = null;

  // Función para establecer el estado de uploading
  const setUploading = (value) => {
    uploading = value;
  };

  // Función para establecer la URL del archivo
  const setFileUrl = (url) => {
    fileUrl = url;
  };

  // Función para cargar la imagen
  const uploadImage = async () => { // No necesitas ningún parámetro aquí
    setUploading(true);
  
    // Accede al evento directamente dentro de la función
    let file = File; // Utiliza el archivo pasado como parámetro a la función uploadFilesUsuarios
    let filePath = `${Date.now()}_${file.name}`;
  
    try {
      const { data, error } = await supabase.storage
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
  
  
      setFileUrl(publicUrlData.publicUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen: ' + error.message);
    } finally {
      setUploading(false);
    }
  };
  
  // Llama a la función de carga de imagen al iniciar la función uploadFilesUsuarios
  await uploadImage(File);

  // Retorna el URL de la imagen
  return fileUrl;
}

  // const storageRef = ref(storage, v4());
  // await uploadBytes(storageRef, File)
  // const url = await getDownloadURL(storageRef)
  // return url

export const uploadFilesProductos = async (File) =>{
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, File)
    const url = await getDownloadURL(storageRef)
    return url  
}
