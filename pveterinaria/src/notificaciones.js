const vapidPublicKey = "BCyaVKaUFfh_UsF6Nx1RBu6iG0mC9gtElPSt5xD0jS0TjfKuB4ZDTiLFNpi7dBIMqbDv1g1KSBArEi5yhEwtklU";

// Convierte la clave pública de VAPID a Uint8Array
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

export const pedirPermisoNotificacion = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Permiso para notificaciones concedido');

            const registration = await navigator.serviceWorker.ready;

            try {
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
                console.log('Push Subscription:', subscription);

                // Verifica si la suscripción ya existe (usa el endpoint como identificador único)
                const existingSubscription = localStorage.getItem(subscription.endpoint);
                if (existingSubscription) {
                    console.log('Ya existe una suscripción con este endpoint.');
                } else {
                    // Guarda la suscripción en el almacenamiento local para evitar duplicados
                    localStorage.setItem(subscription.endpoint, JSON.stringify(subscription));

                    // Envía la suscripción al backend
                    await fetch('https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/RegistrarSuscripcion', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(subscription)
                    });
                }
            } catch (error) {
                console.error('Error al suscribirse a las notificaciones push:', error);
            }
        } else {
            console.log('Permiso para notificaciones denegado');
        }
    } else {
        console.log('El navegador no soporta notificaciones o Service Workers');
    }
};