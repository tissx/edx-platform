/**
 * Patner listing on schhol and center listing  Page
 */

import React, { useEffect } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const PartnerListContainer = ({partnerlist}) => {

    var url = window.location.href;
    var split_url = url.split('#')[1]

    function showPartnerOnLoad() {
        if(split_url) {
            if(split_url === "partner") {
                console.log("Redirect to Partner section")

                document.getElementById("partner").scrollIntoView()

                }
            }
    }

useEffect(() => {
    showPartnerOnLoad()
  }, []);

    const option = {
        rtl:false,
        loop:false,
        margin:10,
        nav:false,
        dots:true,
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
 
        <section className="bg-light py-5" id="partner">
            <div className="container listing-container">
                <h1 className="theading-title">Partners</h1>
                <div className="row">
                    <div className="row" id="iconright1">  
                        <OwlCarousel className='owl-theme' {...option}>

                            {partnerlist.results.map((partner) => (
                        
                            <div className="slide shadow-sm border-1">
                                <img src={partner['image']} className="img-fluid"/>
                                <small>{partner['name']}</small>
                            </div>

                            ))}

                            </OwlCarousel>

                    {/* Start No result Found  */}
                    
                    {partnerlist.count=== 0 && (
                    <div className="no-result-found">
                        <div className="no-result-found-msg">Partners are not available.</div>
                    </div>
                    )}
                    {/* End No result Found  */}

                    </div>

                </div>
            </div>
        </section>
                    
    );
};

PartnerListContainer.propTypes = {}

export default PartnerListContainer
