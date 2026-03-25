export const getSEOContent = (toolId: string, toolName: string, primaryKeyword: string, secondaryKeywords: string[] = []) => {
  const secondaryKeywordsText = secondaryKeywords.length > 0 
    ? ` Our tool also helps you ${secondaryKeywords.join(', ')} easily.`
    : '';

  return `
    <article class="prose prose-slate max-w-none">
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Need to ${primaryKeyword}? Clean text online free with Texly!</h2>
        <p>Welcome to <strong>Texly</strong>, your friendly neighborhood for simple text tools. If you've ever struggled with messy text, weird formatting, or just need a quick fix, you're in the right place. Our <strong>${toolName}</strong> is a powerful <strong>${primaryKeyword}</strong> tool built to be fast, easy, and completely free. Whether you need to <strong>${primaryKeyword}</strong> or <strong>clean text online free</strong>, we've got you covered.</p>
        <p>We know how annoying it is to do repetitive tasks by hand. That's why we made this <strong>text cleanup tool online</strong>—to save you time and keep your work clean. No signups, no hidden fees, just pure utility right in your browser to <strong>fix messy text online</strong> instantly. It's the ultimate <strong>text beautifier online free</strong> for your daily needs.${secondaryKeywordsText}</p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">What is the ${toolName} and how can it help?</h2>
        <p>The <strong>${toolName}</strong> is a simple online tool that helps you <strong>${primaryKeyword}</strong> in seconds. Whether you're dealing with a single sentence or a massive document, our tool processes it instantly. It's a perfect <strong>text cleaner tool online</strong> for anyone who works with text daily—from students to developers. You can also <strong>remove empty lines online</strong> or use our <strong>remove duplicate lines tool</strong> to keep your data organized.</p>
        <p>Unlike some other sites, we don't store your data. Everything happens right here in your browser, so your text stays private and secure. It's like having a personal text assistant that's always ready to help you <strong>auto format text online free</strong> and <strong>remove unwanted spaces tool</strong> with just one click.</p>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">How to use it (Step-by-Step)</h2>
        <p>Using this tool is as easy as 1-2-3. Just follow these simple steps:</p>
        <ol class="list-decimal pl-6 space-y-2">
          <li><strong>Paste:</strong> Copy your text and paste it into the input box at the top.</li>
          <li><strong>Adjust:</strong> If there are any options, set them to what you need.</li>
          <li><strong>Fix:</strong> Click the button to process your text. You'll see the result instantly!</li>
          <li><strong>Copy:</strong> Hit the copy button and you're done. Your clean text is ready to use.</li>
        </ol>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Why you'll love this tool</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>It's lightning fast:</strong> No waiting around. Get your results in a blink.</li>
          <li><strong>Totally free:</strong> Use it as much as you want without paying a cent.</li>
          <li><strong>No signup needed:</strong> We won't ask for your email or any personal info.</li>
          <li><strong>Works everywhere:</strong> Use it on your phone, tablet, or computer.</li>
          <li><strong>Privacy first:</strong> Your text never leaves your device.</li>
        </ul>
      </section>

      <section class="mb-12 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h2 class="text-xl font-bold text-slate-900 mb-4">Real-Life Example</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="font-bold text-slate-700 mb-2">Before:</p>
            <div class="p-3 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-500 italic">
              Messy text with ${primaryKeyword} issues...
            </div>
          </div>
          <div>
            <p class="font-bold text-slate-700 mb-2">After:</p>
            <div class="p-3 bg-white border border-blue-200 rounded-lg text-sm font-mono text-blue-600">
              Perfectly cleaned text!
            </div>
          </div>
        </div>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Who is this for?</h2>
        <p>Our <strong>${toolName}</strong> is used by thousands of people every day, including:</p>
        <ul class="list-disc pl-6 space-y-2">
          <li><strong>Students:</strong> For formatting essays and cleaning up research notes.</li>
          <li><strong>Writers & Bloggers:</strong> To keep their drafts clean and professional.</li>
          <li><strong>Developers:</strong> For cleaning up code strings or data logs.</li>
          <li><strong>Office Workers:</strong> To fix messy spreadsheets or email text.</li>
          <li><strong>Social Media Managers:</strong> To format captions and bios perfectly.</li>
        </ul>
      </section>

      <section class="mb-12">
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Frequently Asked Questions about Text Cleaning</h2>
        <div class="space-y-6">
          <div>
            <h3 class="font-bold text-slate-800">Is there a limit to how much text I can process?</h3>
            <p>Nope! You can process as much text as your browser can handle. For very large files, it might take an extra second, but it works great for most tasks.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Is my data safe with Texly?</h3>
            <p>Absolutely. We don't send your text to any servers. All the processing happens locally in your browser, so your privacy is 100% protected.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Do I need to install anything?</h3>
            <p>No installation required. Texly works right in your web browser on any device.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Can I use this on my mobile phone?</h3>
            <p>Yes! Our website is fully responsive and works perfectly on smartphones and tablets.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Why is this tool free?</h3>
            <p>We believe simple text tools should be available to everyone. We keep the site running with minimal ads so you can enjoy these tools for free.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Can I remove unwanted spaces tool with this?</h3>
            <p>Yes, our suite of tools includes options to <strong>remove unwanted spaces tool</strong> and other formatting issues easily.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Is there a word counter online free available?</h3>
            <p>Yes, we also provide a <strong>word counter online free</strong> and a <strong>character counter tool</strong> to help you track your text length.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Can I convert text to uppercase online or lowercase?</h3>
            <p>Definitely! You can <strong>convert text to uppercase online</strong> or <strong>convert text to lowercase online</strong> using our converter tools.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">How do I ${primaryKeyword} with this tool?</h3>
            <p>Simply paste your text into the input area, and our <strong>${primaryKeyword}</strong> tool will process it instantly. It's the easiest way to <strong>clean text online free</strong>.</p>
          </div>
          <div>
            <h3 class="font-bold text-slate-800">Is there a free ${primaryKeyword} tool available?</h3>
            <p>Yes, Texly offers a completely free <strong>${primaryKeyword}</strong> tool that works directly in your browser without any registration.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold text-slate-900 mb-4">Ready to use our ${primaryKeyword} tool?</h2>
        <p>Give the <strong>${toolName}</strong> a try right now! Just paste your text above and see the magic happen. If you find it useful, don't forget to bookmark us and share it with your friends. Happy text fixing with our <strong>${primaryKeyword}</strong> and <strong>text cleanup tool online</strong>!</p>
      </section>
    </article>
  `;
};

export const getJSONLD = (toolName: string, slug: string, keyword: string) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is there a limit to how much text I can process with the ${toolName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, there is no hard limit. You can process as much text as your browser can handle."
        }
      },
      {
        "@type": "Question",
        "name": `Is my data safe with Texly's ${toolName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your data is 100% safe. All processing happens locally in your browser; we never store or see your text."
        }
      },
      {
        "@type": "Question",
        "name": `Do I need to sign up to use the ${toolName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No signup or registration is required. You can use all our tools for free instantly."
        }
      },
      {
        "@type": "Question",
        "name": `Does the ${toolName} work on mobile devices?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Texly is fully responsive and works perfectly on all mobile phones and tablets."
        }
      },
      {
        "@type": "Question",
        "name": `Why should I use Texly for ${keyword}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Texly is fast, free, private, and requires no installation. It's the simplest way to manage your text online."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://texly.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": toolName,
        "item": `https://texly.online/tool/${slug}`
      }
    ]
  };

  return [faqSchema, breadcrumbSchema];
};
