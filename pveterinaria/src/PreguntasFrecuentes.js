import React, { useState } from 'react';
import Layout from './Layout';

const PreguntasFrecuentes = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Cuál es el horario de atención?",
            answer: (
                <>
                    <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
                    <p>Sábados: 10:00 am - 4:00 pm</p>
                    <p>Domingos: Cerrado</p>
                </>
            )
        },
        {
            question: "¿Dónde se encuentra la tienda?",
            answer: <p>Dirección: Calle de la Estética Canina, Ciudad</p>
        },
        {
            question: "¿Cómo puedo contactar con ustedes?",
            answer: (
                <>
                    <p>Email: info@esteticacanina.com</p>
                    <p>Teléfono: (123) 456-7890</p>
                </>
            )
        },
        {
            question: "¿Cuál es la política de devolución?",
            answer: (
                <>
                    <p>Las devoluciones deben realizarse dentro de los 30 días siguientes a la compra.</p>
                    <p>Los productos deben estar en su estado original y en su embalaje original.</p>
                </>
            )
        },
        {
            question: "¿Ofrecen envíos internacionales?",
            answer: <p>Sí, ofrecemos envíos internacionales a una variedad de países.</p>
        },
        {
            question: "¿Cuáles son los servicios que ofrecen?",
            answer: <p>Ofrecemos servicios de baño, corte de pelo, limpieza de oídos, corte de uñas y más.</p>
        },
        {
            question: "¿Necesito hacer una cita previa?",
            answer: <p>Sí, recomendamos hacer una cita previa para asegurar disponibilidad.</p>
        },
        {
            question: "¿Qué productos utilizan para el cuidado de las mascotas?",
            answer: <p>Utilizamos productos de alta calidad y específicos para el tipo de piel y pelo de cada mascota.</p>
        },
        {
            question: "¿Ofrecen servicio a domicilio?",
            answer: <p>Sí, tenemos servicio a domicilio para mayor comodidad de nuestros clientes.</p>
        },
        {
            question: "¿Cómo puedo hacer una cita?",
            answer: <p>Puede hacer una cita llamándonos al (123) 456-7890 o a través de nuestro sitio web.</p>
        },
        {
            question: "¿Qué debo llevar a la cita?",
            answer: <p>Por favor, traiga la cartilla de vacunación de su mascota y cualquier información relevante sobre su salud.</p>
        },
        {
            question: "¿Puedo quedarme mientras atienden a mi mascota?",
            answer: <p>Sí, puede quedarse en nuestra sala de espera mientras atendemos a su mascota.</p>
        },
        {
            question: "¿Qué métodos de pago aceptan?",
            answer: <p>Aceptamos efectivo, tarjetas de crédito y débito, así como pagos a través de aplicaciones móviles.</p>
        },
        {
            question: "¿Tienen algún programa de fidelidad o descuentos?",
            answer: <p>Sí, ofrecemos un programa de fidelidad con descuentos especiales para nuestros clientes frecuentes.</p>
        },
        {
            question: "¿Qué pasa si mi mascota tiene necesidades especiales?",
            answer: <p>Estamos capacitados para atender mascotas con necesidades especiales. Por favor, infórmenos de cualquier condición especial al hacer su cita.</p>
        }
    ];

    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        marginTop: '100px'
    };

    const faqItemStyle = {
        borderBottom: '1px solid #ddd',
        padding: '10px 0',
    };

    const faqQuestionStyle = {
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0',
        position: 'relative',
        marginTop: '50px'
    };

    const faqAnswerStyle = {
        padding: '10px 0',
        fontSize: '16px',
    };

    const arrowStyle = {
        fontSize: '12px',
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'transform 0.3s',
    };

    const openArrowStyle = {
        ...arrowStyle,
        transform: 'translateY(-50%) rotate(180deg)',
    };

    return (
        <Layout>
            <div style={containerStyle}>
            <h1 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                    Preguntas Frecuentes
                </h1>
                {faqs.map((faq, index) => (
                    <div key={index} style={faqItemStyle}>
                        <h2
                            onClick={() => handleClick(index)}
                            style={faqQuestionStyle}
                        >
                            {faq.question}
                            <span
                                style={activeIndex === index ? openArrowStyle : arrowStyle}
                            >
                                ▼
                            </span>
                        </h2>
                        {activeIndex === index && <div style={faqAnswerStyle}>{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </Layout>
    );

};

export default PreguntasFrecuentes;
