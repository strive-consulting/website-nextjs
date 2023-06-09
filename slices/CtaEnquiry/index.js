import React from "react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import Image from "next/image";
const CtaEnquiry = ({ slice }) => (
  <div className="row mb-5">
    <div className="col g-0">
      <div className="cta-area">
        <div className="container">
          <div className="cta-bg bg-theme">
            <div className="cta-number-icon">
              <i>
                <Image
                  src="/assets/img/logo/square_logo.png"
                  className="img-fluid"
                  alt="Strive icon"
                  width={60}
                />
              </i>
            </div>
            <div className="col cta-description">
              <div className="cta-number-text fix">
                <span className="uppercase">Instant Estimate</span>
                <h3>
                  <a href="tel:+97144396282">+971 4 439 6282</a>
                </h3>
              </div>
            </div>
            <div className="col cta-btn text-lg-end text-start">
              <Link href="/dubai-company-setup-cost">
                <a className="theme-btn black-btn">
                  <span>{slice.primary.button_text}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  // <section>
  //   <span className="title">
  //     {
  //       slice.primary.title ?
  //       <PrismicRichText field={slice.primary.title}/>
  //       : <h2>Template slice, update me!</h2>
  //     }
  //   </span>
  //   {
  //     slice.primary.description ?
  //     <PrismicRichText field={slice.primary.description}/>
  //     : <p>start by editing this slice from inside Slice Machine!</p>
  //   }
  //   <style jsx>{`
  //       section {
  //         max-width: 600px;
  //         margin: 4em auto;
  //         text-align: center;
  //       }
  //       .title {
  //         color: #8592e0;
  //       }
  //   `}</style>
  // </section>
);

export default CtaEnquiry;
