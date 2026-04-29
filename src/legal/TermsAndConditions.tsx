import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsAndConditions = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.footer.termsOfService} - Texly`;
  }, [t.footer.termsOfService]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-slate max-w-none">
        <h1>{t.legal.termsTitle}</h1>
        <p>Welcome to Texly!</p>
        
        <p>These terms and conditions outline the rules and regulations for the use of Texly's Website, located at https://texlyonline.in.</p>

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

        <h2>Your Content</h2>
        <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Texly a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
        <p>Your Content must be your own and must not be invading any third-party's rights. Texly reserves the right to remove any of Your Content from this Website at any time without notice.</p>

        <h2>No warranties</h2>
        <p>This Website is provided "as is," with all faults, and Texly express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

        <h2>Limitation of liability</h2>
        <p>In no event shall Texly, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Texly, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way connected with your use of this Website.</p>

        <h2>Indemnification</h2>
        <p>You hereby indemnify to the fullest extent Texly from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

        <h2>Severability</h2>
        <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

        <h2>Variation of Terms</h2>
        <p>Texly is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

        <h2>Assignment</h2>
        <p>The Texly is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>

        <h2>Entire Agreement</h2>
        <p>These Terms constitute the entire agreement between Texly and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>

        <h2>Governing Law & Jurisdiction</h2>
        <p>These Terms will be governed by and interpreted in accordance with the laws of the State of India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in India for the resolution of any disputes.</p>
      </article>
    </div>
  );
};

export default TermsAndConditions;
