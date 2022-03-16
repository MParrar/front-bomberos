import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { obtenerCitaciones } from '../../services/Citacion';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}
export const CarouselCitaciones = ({ idCuartel }) => {

    const [citaciones, setCitaciones] = useState([]);
    useEffect(() => {
        const listaCitaciones = async () => {
            const respuesta = await obtenerCitaciones();
            const citacionesFiltradas = respuesta.filter(cita => cita.cuartel?._id === idCuartel)
            setCitaciones(citacionesFiltradas);
        };
        listaCitaciones();
    }, []);

    const renderSlides = () =>
        citaciones.map(citacion => (
            <div key={citacion._id} style={{ width: '100%', margin: '0' }}>
                <marquee className='' style={{ width: '100%', margin: '0', scrolDelay: '400' }}> {citacion.citacion}</marquee>
            </div>
        ));
    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SampleNextArrow />
    };
    return (
        <div style={{ width: '100%', margin: '0' }}>
            {
                <Slider

                    {...settings}
                >
                    {renderSlides()}
                </Slider>
            }
        </div>
    );
}
