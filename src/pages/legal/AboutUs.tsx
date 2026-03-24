import React, { useEffect } from 'react';
import { Zap, Shield, Heart } from 'lucide-react';

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us - Texly";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article className="prose prose-slate max-w-none">
        <h1>About Texly</h1>
        <p className="lead">Texly is a free online platform dedicated to providing the most comprehensive and easy-to-use text manipulation tools on the web.</p>
        
        <p>Our mission is simple: to save you time. Whether you're a developer cleaning up messy data, a writer formatting a manuscript, or a student working on an assignment, we believe that text processing shouldn't be a chore.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="mt-0">Fast & Efficient</h3>
            <p className="mb-0">All our tools are optimized for speed. Processing happens instantly in your browser, so you never have to wait.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="mt-0">Privacy Focused</h3>
            <p className="mb-0">Your data never leaves your computer. We process everything client-side, ensuring your sensitive information stays private.</p>
          </div>
        </div>

        <h2>Our Story</h2>
        <p>Texly started as a small side project to solve a common problem: the lack of a single, clean place for basic text utilities. Over time, we've expanded our library to over 60 tools, covering everything from simple case conversion to complex data extraction.</p>

        <h2>Why Use Texly?</h2>
        <ul>
          <li><strong>60+ Tools:</strong> A massive variety of tools in one place.</li>
          <li><strong>No Sign-up Required:</strong> Use all our features without ever creating an account.</li>
          <li><strong>Clean Interface:</strong> No distracting ads or cluttered layouts.</li>
          <li><strong>Regular Updates:</strong> We're constantly adding new tools based on user feedback.</li>
        </ul>

        <p>We are committed to keeping Texly free and accessible for everyone. If you find our tools useful, please consider sharing them with your friends and colleagues!</p>
        
        <div className="mt-12 p-8 bg-blue-600 rounded-3xl text-white text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
          <h2 className="text-white mt-0">Thank you for using Texly!</h2>
          <p className="text-blue-100 mb-0">We hope our tools help you work smarter and faster every day.</p>
        </div>
      </article>
    </div>
  );
};

export default AboutUs;
