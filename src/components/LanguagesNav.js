import React from 'react';
import PropTypes from 'prop-types';

const LanguagesNav = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            style={
              language === selectedLanguage ? { color: 'rgb(187,46,31)' } : null
            }
            onClick={() => setSelectedLanguage(language)}
            className="btn-clear nav-link">
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
};

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  setSelectedLanguage: PropTypes.func.isRequired
};

export default LanguagesNav;
