import React, { Component } from "react";
import counterpart from 'counterpart';
import es from '../Translates/es'
import en from '../Translates/en'

counterpart.registerTranslations('es', en);
counterpart.registerTranslations('en', es);
counterpart.setLocale('es');

class LanguageSelect extends Component {
  state = {
    lang: 'es'
  }

  onLangChange = (e) => {
    this.setState({lang: e.target.value});
    counterpart.setLocale(e.target.value);
  }

  render() {

	return(
		<div className="dropdown">
	 <select  value={this.state.lang} onChange={this.onLangChange}>
          <option value="en">Ingles</option>
          <option value="es">Español</option>
        </select>
	</div>
	);
}
}

export default LanguageSelect;