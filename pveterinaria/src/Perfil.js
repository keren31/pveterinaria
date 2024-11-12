import React, { useState, useRef, useEffect } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from './Layout';
import PerfilLayout from './perfil/PerfilLayout';
import CryptoJS from 'crypto-js';

import { uploadFilesUsuarios } from './firebase';

const Perfil = () => {
    const navigate = useNavigate();
    const { user, setUser, logoutUser } = useUser();
    const [profileImage, setProfileImage] = useState(() => {
        // Carga la imagen desde localStorage al iniciar
        return localStorage.getItem('profileImage') || user?.Icono || "https://via.placeholder.com/150";
    });
    const videoRef = useRef(null);
    const canvasRef = useRef(document.createElement("canvas"));
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const ENCRYPTION_KEY = "Soymainekko1#"; // Reemplaza con tu clave de encriptación

    const cerrarSesion = () => {
        logoutUser();
        navigate('/');
        Swal.fire({
            icon: 'warning',
            title: 'Nos vemos pronto',
            text: 'Cerraste sesión, nos vemos. Regresa cuando quieras embellecer a tu mejor amigo.',
        });
    };

    

    const abrirCamara = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            Swal.fire({
                title: 'Captura tu nueva foto de perfil',
                html: `<video id="video" autoplay playsinline style="width: 100%; height: auto;"></video>`,
                showCancelButton: true,
                confirmButtonText: 'Capturar Foto',
                didOpen: () => {
                    const videoElement = document.getElementById('video');
                    if (videoElement) {
                        videoElement.srcObject = stream;
                        videoRef.current = videoElement;
                    }
                },
                preConfirm: () => {
                    const canvas = canvasRef.current;
                    const video = videoRef.current;
                    if (video && canvas) {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const context = canvas.getContext('2d');
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        // Convierte el contenido del canvas a un archivo Blob
                        return new Promise((resolve) => {
                            canvas.toBlob(async (blob) => {
                                const file = new File([blob], "profile_photo.png", { type: "image/png" });
                                const result = await uploadFilesUsuarios(file);

                                // Subir el icono actualizado al backend
                                const data = new FormData();
                                data.append("idUsuario", user.idUsuario);
                                data.append("Icono", result);

                                fetch(apiurll + "api/CasaDelMarisco/SubirIcono", {
                                    method: "POST",
                                    body: data,
                                })
                                    .then((res) => res.json())
                                    .then((result1) => {
                                        if (result1 === "Icono actualizado") {
                                            const updatedUser = { ...user, Icono: result };
                                            setUser(updatedUser);
                                            setProfileImage(result); // Actualiza la vista actual del perfil
                                            
                                            // Actualiza localStorage con la información del usuario actualizado
                                            localStorage.setItem(
                                                'userData',
                                                CryptoJS.AES.encrypt(JSON.stringify(updatedUser), ENCRYPTION_KEY).toString()
                                            );

                                            Swal.fire({
                                                icon: "success",
                                                title: "Foto de perfil actualizada",
                                                text: "La foto se subió correctamente",
                                            });
                                        }
                                    });
                            }, 'image/png');
                        });
                    }
                },
                willClose: () => {
                    // Detiene la transmisión de video al cerrar el modal
                    if (videoRef.current?.srcObject) {
                        const stream = videoRef.current.srcObject;
                        const tracks = stream.getTracks();
                        tracks.forEach((track) => track.stop());
                    }
                }
            });
        } catch (error) {
            console.error("Error al acceder a la cámara", error);
        }
    };

    return (
        <Layout>
            <PerfilLayout>
                <div style={{
                    padding: '50px',
                    width: '600px',
                    margin: '50px auto',
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}>
                        {/* Muestra la imagen de perfil actualizada */}
                        <img
                            src={profileImage}
                            alt="Avatar"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid #007bff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                marginBottom: '20px',
                            }}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                                Perfil de Usuario
                            </h4>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Correo:</strong> {user ? user.Correo : 'Correo del Usuario'}
                            </p>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Teléfono:</strong> {user ? user.Telefono : 'Teléfono del Usuario'}
                            </p>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Estado de la cuenta:</strong> {user ? user.Rol : 'Estado de la cuenta del Usuario'}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        <button style={{
                            width: '100%',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                        >
                            Cambiar Contraseña
                        </button>
                        <button
                            style={{
                                width: '100%',
                                backgroundColor: '#28a745',
                                color: '#ffffff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                            onClick={abrirCamara}
                        >
                            Editar foto perfil 
                        </button>
                        <button
                            style={{
                                width: '100%',
                                backgroundColor: '#dc3545',
                                color: '#ffffff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </PerfilLayout>
        </Layout>
    );
};

export default Perfil;
