import { Helmet } from "react-helmet-async";
import TrustBar from "@/components/TrustBar";

const AddCustomerPage = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Add Customer</title>
        {/* Form embed script - loaded via Helmet for Safari compatibility (dynamic appendChild can fail in Safari) */}
        <script src="https://link.msgsndr.com/js/form_embed.js" async />
      </Helmet>
      <div className="min-h-[803px] w-full">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/20DTl9TFYlBvFDGmVBWE"
          className="w-full min-h-[803px] border-0 rounded-md"
          id="inline-20DTl9TFYlBvFDGmVBWE"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Client Review + 1 Year Followup Sequence Form"
          data-height="803"
          data-layout-iframe-id="inline-20DTl9TFYlBvFDGmVBWE"
          data-form-id="20DTl9TFYlBvFDGmVBWE"
          title="Client Review + 1 Year Followup Sequence Form"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <TrustBar />
    </>
  );
};

export default AddCustomerPage;
