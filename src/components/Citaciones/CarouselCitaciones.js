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

export const CarouselCitaciones = () => {

    const [citaciones, setCitaciones] = useState([]);

    useEffect(() => {
        const listaCitaciones = async () => {
            const respuesta = await obtenerCitaciones();
            setCitaciones(respuesta);
        };
        listaCitaciones();
    }, []);

    const renderSlides = () =>
        citaciones.map(citacion => (
            <div>
                <h3 className='pt-2'> {citacion.citacion}</h3>
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
        <div className="container">
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
