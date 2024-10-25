import React from 'react';
import PropTypes from 'prop-types';

const checkPasswordStrength = (password, minChar) => {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);

    let strength = 0;

    if (password.length >= minChar) {
        strength++;
    }

    if (lowcase) {
        strength++;
    }

    if (uppcase) {
        strength++;
    }

    if (numbers) {
        strength++;
    }

    if (special) {
        strength++;
    }

    return strength;
};

export const MedidorSeguridad = ({ password }) => {
    const strength = checkPasswordStrength(password, 8);

    const getStrengthColor = () => {
        switch (strength) {
            case 0:
            case 1:
                return 'red'; // Débil
            case 2:
            case 3:
                return 'orange'; // Moderado
            case 4:
                return 'blue'; // Fuerte
            case 5:
                return 'green'; // Muy fuerte
            default:
        }
    };

    const getStrengthText = () => {
        switch (strength) {
            case 0:
            case 1:
                return 'Bajo'; // Débil
            case 2:
            case 3:
                return 'Medio'; // Moderado
            case 4:
                return 'Bueno'; // Fuerte
            case 5:
                return 'Óptimo'; // Muy fuerte
            default:
        }
    };

    return (
        <div style={{ marginBottom: '-20px', marginTop: '10px', textAlign:'center' }}>
            <div
                style={{
                    width: `${(strength / 5) * 100}%`,
                    height: '15px',
                    backgroundColor: getStrengthColor(),
                    marginBottom: '-21px',
                    borderRadius:'15px'
                }}
            />
            <span style={{ fontSize: '10px', color:'white' }}>Nivel de seguridad: {getStrengthText()}</span>
        </div>
    );
};

// Validación de las props
MedidorSeguridad.propTypes = {
    password: PropTypes.string.isRequired, // Define que 'password' es un string y es requerido
};