import React from 'react';
import './Details.css';

const Details = () => {
  return (
    <section className="details">
      <div className="details__how">
        <h4>How does it work?</h4>
        <p>The postcss-amplify plugin parses the CSS to filter out:</p>

        <ul className="details__how-list">
          <li>Media queries for desktop breakpoints</li>
          <li>Non <code>-webkit-</code> vendor prefixes</li>
          <li><code>!important</code> flags</li>
          <li>Invalid selectors like <code>-amp</code> classes or <code>i-amp</code> tags</li>
          <li>Specific block names or class prefixes</li>
        </ul>
      </div>

      <div className="details__bugs">
        <p className="details__bugs-content">
          Notice any unexpected side effects or other bugs in your CSS output? Let me know in the <a href="https://github.com/laurenashpole/postcss-amplify/issues">Github</a> issues and I'll try to find a fix.
        </p>
      </div>
    </section>
  );
};

export default Details;