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
      <div className="min-h-[842px] w-full">
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/urhI2nZYgBzwKWdTCXIT"
          className="w-full min-h-[842px] border-0 rounded-lg"
          id="inline-urhI2nZYgBzwKWdTCXIT"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Client Review + 1 Year Followup Sequence Form"
          data-height="842"
          data-layout-iframe-id="inline-urhI2nZYgBzwKWdTCXIT"
          data-form-id="urhI2nZYgBzwKWdTCXIT"
          title="Client Review + 1 Year Followup Sequence Form"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <TrustBar />
    </>
  );
};

export default AddCustomerPage;
