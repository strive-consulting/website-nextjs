'use client'
import { useContext, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Select from "react-select";
import CalculatorContext from "../../context/CalculatorContext";
import { useRouter } from "next/navigation";
import { businessActivities, premisesTypes, timelineOptions } from '@/app/constants'
import CalculatorUserForm from "./calculator-user-form";
// import { faL } from "@fortawesome/free-solid-svg-icons";

type Props = {
  embed: boolean;
};
const Calculator: React.FC<Props> = ({ embed }) => {
  const router = useRouter();

  const [formStep, setFormStep] = useState(1);

  const [selectedBusinessActivity, setSelectedBusinessActivity] = useState(null);
  const [businessActivityValid, setSelectedBusinessActivityValid] = useState(true);

  const [selectedPremises, setSelectedPremises] = useState(null);
  const [premisesValid, setSelectedPremisesValid] = useState(true);

  const [ownersValid, setOwnersValid] = useState(true);
  const [visasValid, setVisasValid] = useState(true);

  const context = useContext(CalculatorContext);

  const businessActivitiesSorted = businessActivities.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const premisesTypesSorted = premisesTypes.sort((a, b) => a.label.localeCompare(b.label));

  const containerClass = embed
    ? "enquiryform py-5 fix calculator embed"
    : "enquiryform py-5 fix calculator";

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    context?.setInputs({ ...context.inputs, [e.target.name]: e.target.value });
    setOwnersValid(true);
    setVisasValid(true);
    //console.log(inputs);
    console.log("context", context);
  };

  //Select controlled
  const handleBusinessType = (selection) => {
    console.log(selection);
    context?.setInputs({
      ...context.inputs,
      businessactivity: selection,
      businessactivitySelected: selection.label,
    });
    // context.setInputs({ ...context.inputs, businessactivitySelected: selection.label });
    setSelectedBusinessActivity(selection); //react-select expects an object of name and value
    setSelectedBusinessActivityValid(true); //validator
    console.log(context?.inputs);
  };

  const handlePremisesType = (selection) => {
    context?.setInputs({
      ...context.inputs,
      premises: selection,
      premisesSelected: selection.label,
    });
    // context.setInputs({ ...context.inputs, premisesSelected: selection.label });
    setSelectedPremises(selection); //react-select expects an object of name and value
    setSelectedPremisesValid(true); //validator
    console.log(context?.inputs);
  };

  function validateFormStep1() {

    if (!selectedBusinessActivity || selectedBusinessActivity.value === "") {
      setSelectedBusinessActivityValid(false);
      return;
    }

    if (!selectedPremises || selectedPremises.value === "") {
      setSelectedPremisesValid(false);
      return;
    }

    if (parseInt(context.inputs.owners) < 1) {
      setOwnersValid(false);
      return;
    }

    if (context?.inputs.visas === "") {
      setVisasValid(false);
      return;
    }
    //TODO small delay
    setFormStep(2);
  }

  return (
    <div>
      <main>
        {/* <Breadcrumb pageTitle="Contact" image="header_about.jpg" /> */}

        <section className={containerClass}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                {/* <h5 className="kservice-text-subtitle mb-15">Let&apos;s Get Started</h5> */}
                <h1 className="kservice-text-title mb-35 text-center">
                  {formStep === 1 ? "Instant Estimate" : "Last Step"}
                </h1>

                {formStep === 1 && (
                  <>
                    <p>Fill in our smart calculator to get an instant estimate now.</p>

                    {/* dummy form to detect on netlify. On the actual form submission, we are fetching value from CONTEXT (not form)
                    which are named the same as these values (see ICalculatorContent) */}
                    <form name="estimate" data-netlify="true">
                      <input type="hidden" name="form-name" value="estimate"></input>
                      <input type="hidden" name="firstname" />
                      <input type="hidden" name="lastname" />
                      <input type="hidden" name="callback" />
                      <input type="hidden" name="phonenumber" />
                      <input type="hidden" name="email" />
                      <input type="hidden" name="nationality" />
                      <input type="hidden" name="businessactivitySelected" />
                      <input type="hidden" name="premisesSelected" />
                      <input type="hidden" name="owners" />
                      <input type="hidden" name="visas" />
                      <input type="hidden" name="timelineSelected" />
                    </form>

                    <div className="row">
                      <div className="col-12 mb-20">
                        <label>Business Activity</label>
                        <Select
                          name="businessActivity"
                          // value={selectedBusinessActivity}
                          onChange={handleBusinessType}
                          options={businessActivitiesSorted}
                          className="react-select-form-control"
                          classNamePrefix="react-select-inner-form-control"
                          isSearchable={true}
                        />
                        <div
                          className="validator"
                          style={{ display: businessActivityValid ? "none" : "block" }}>
                          Please select a business activity
                        </div>
                      </div>
                      <div className="col-12 mb-20">
                        <label>Premises type</label>
                        <Select
                          // value={selectedPremises}
                          onChange={handlePremisesType}
                          options={premisesTypesSorted}
                          className="react-select-form-control"
                          classNamePrefix="react-select-inner-form-control"
                        />
                        <div
                          className="validator"
                          style={{ display: premisesValid ? "none" : "block" }}>
                          Please select a premises type
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-20">
                        <label>Number of partners/shareholders</label>
                        <input
                          type="number"
                          className="form-control"
                          name="owners"
                          value={context.inputs.owners}
                          onChange={handleChange}
                        />
                        <div
                          className="validator"
                          style={{ display: ownersValid ? "none" : "block" }}>
                          Please enter 1 or more partners/shareholders
                        </div>
                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-20">
                        <label>Visas required</label>
                        <input
                          type="number"
                          className="form-control"
                          name="visas"
                          value={context.inputs.visas}
                          onChange={handleChange}
                        />
                        <div
                          className="validator"
                          style={{ display: visasValid ? "none" : "block" }}>
                          Please enter 0 or more visas
                        </div>
                      </div>
                      <div className="col-xxl-12 col-xl-12 mb-20">
                        <button
                          type="button"
                          className="theme-btn border-btn"
                          onClick={() => validateFormStep1()}>
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {formStep === 2 && (
                  <>
                    <p>Fill in the details below and we will email you your estimate instantly.</p>
                    <CalculatorUserForm afterQuote={false} />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Calculator;
