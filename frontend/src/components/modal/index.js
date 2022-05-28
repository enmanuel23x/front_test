import React, { forwardRef } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProgressiveImage from "react-progressive-image";
import withClickOutside from '../helpers/WithClickOutside';

const Modal = forwardRef(({ data: modal }, ref) => {
    return (
        <div className="modal-container">
            <div className="modal-container-bg"></div>
            <ProgressiveImage
                src={`https://deviants-factions.mo.cloudinary.net/cards/${modal.id}.${modal.type}?tx=w_600,q_80,f_auto`}
            >
                {src =>
                    <section ref={ref}>
                        <LazyLoadImage
                            className="modal-img"
                            alt=""
                            height={'auto'}
                            width={600}
                            src={src}
                        />
                    </section>
                }
            </ProgressiveImage>
        </div>
    );
})

export default withClickOutside(Modal);
