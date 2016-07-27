import { default as React } from 'react';
import en from './i18n/en';
import ptbr from './i18n/pt-br';

const languages = {
  en,
  ptbr
};

export default function translate(key) {
  return Component => {
    class TranslationComponent extends React.Component {
      render() {
        const currentLanguage = this.context.currentLanguage.replace('-', '');

        if (languages[currentLanguage]) {
          // console.log('current language: ', this.context.currentLanguage);
          const strings = languages[currentLanguage][key];

          return <Component {...this.props} {...this.state} strings={strings} />;
        }
        // Language not found. It will use the detault.
        // console.log('current language NOT FOUND: ', this.context.currentLanguage);
        return <Component {...this.props} {...this.state} />;
      }
    }

    TranslationComponent.contextTypes = {
      currentLanguage: React.PropTypes.string
    };

    return TranslationComponent;
  };
}
