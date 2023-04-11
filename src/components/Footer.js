import React from "react";
import { Link } from "react-router-dom"

function Footer () {
    return(
        <>
            <div className="mobile-menu">
                <div className="body mobile-contact">
                    <Link to="/">
                        <button className="action button">
                            <img src="/svgs/home.svg" alt=""/>
                            <p>HOME</p>
                        </button>
                    </Link>
                    <Link to="/stake">
                        <button className="action button me-4 ms-4">
                            <img src="/svgs/home.svg" alt=""/>
                            <p>STAKE</p> 
                        </button> 
                    </Link>
                    <Link to="/faqs">
                        <button className="button action">
                            <img src="/svgs/about.svg" alt=""/>
                           <p>FAQs</p>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Footer;