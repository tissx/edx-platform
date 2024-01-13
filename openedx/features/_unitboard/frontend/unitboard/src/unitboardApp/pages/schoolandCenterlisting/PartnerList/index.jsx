/**
 * Patner listing on schhol and center listing  Page
 */

import React, { useState, useEffect } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const PartnerListContainer = ({partnerlist}) => {
// console.log("partner", partnerlist)
    const option = {
        rtl:false,
        loop:true,
        margin:10,
        nav:false,
        dots:false,
        autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            100:{
                items:3
            },
            400:{
                items:4
            }
            ,
            800:{
                items:5
            }
            ,
            1000:{
                items:6
            }
        }
    }





    return (
        
 
        <section className="bg-light py-5 my-5">
            <div className="container listing-container">
                <h1 className="theading-title py-4">Partners</h1>
                <div className="row">
                    {/* <section className="customer-logos slider"> */}
                    <div className="row" id="iconright1">  

                    <OwlCarousel className='owl-theme' {...option}>

                        {partnerlist.map((partner) => (
                       
                        <div className="slide shadow-sm border-1">
                            <img src={partner['image']} className="img-fluid"/>
                            <small>{partner['name']}</small>
                        </div>

                         ))}

                                
                        </OwlCarousel>
                </div>
                    {/* </section> */}

                </div>
            </div>
        </section>


                    
    );
};

PartnerListContainer.propTypes = {}

export default PartnerListContainer
