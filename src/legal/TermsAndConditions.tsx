import React, { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    document.title = "Terms and Conditions - Texly";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-slate max-w-none">
        <h1>Terms and Conditions</h1>
        <p>Welcome to Texly!</p>
        
        <p>These terms and conditions outline the rules and regulations for the use of Texly's Website, located at https://texly.online.</p>

        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Texly if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h2>License</h2>
        <p>Unless otherwise stated, Texly and/or its licensors own the intellectual property rights for all material on Texly. All intellectual property rights are reserved. You may access this from Texly for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <p>You must not:</p>
        <ul>
          <li>Republish material from Texly</li>
          <li>Sell, rent or sub-license material from Texly</li>
          <li>Reproduce, duplicate or copy material from Texly</li>
          <li>Redistribute content from Texly</li>
        </ul>

        <h2>User Comments</h2>
        <p>This Agreement shall begin on the date hereof.</p>
        <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Texly does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Texly, its agents and/or affiliates.</p>

        <h2>Hyperlinking to our Content</h2>
        <p>The following organizations may link to our Website without prior written approval:</p>
        <ul>
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
        </ul>

        <h2>iFrames</h2>
        <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

        <h2>Content Liability</h2>
        <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.</p>

        <h2>Your Privacy</h2>
        <p>Please read Privacy Policy.</p>

        <h2>Reservation of Rights</h2>
        <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.</p>

        <h2>Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
        <ul>
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
      </article>
    </div>
  );
};

export default TermsAndConditions;
