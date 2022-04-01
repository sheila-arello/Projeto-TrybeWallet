import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currency: '',
      // tag: '',
      // method: '',
    };
  }

  renderInput = (name, placeHolder) => (
    <label htmlFor={ name }>
      { `${name}:` }
      <input
        placeholder={ placeHolder }
        data-testid={ `${name}-input` }
        id={ `${name}-input` }
        type="text"
        name={ name }
      />
    </label>
  );

  renderSelect = (name, arrValues) => (
    <label htmlFor={ (name === 'currency') ? 'moeda' : `${name}` }>
      { (name === 'currency') ? 'moeda:' : `${name}:` }
      <select
        className="choices"
        id={ (name === 'currency') ? 'moeda' : `${name}` }
        name={ name }
        // value={ name }
        // onChange={ this.onInputChange }
        data-testid={ `${name}-input` }
      >
        { arrValues.map((curr) => (
          <option
            key={ curr }
            value={ curr }
          >
            { curr }
          </option>
        ))}
      </select>
    </label>
  )

  // formLoad = () => {
  //   const { both } = this.state;

  //   return both.map((li) => <Input name={ li[0] } placeH={ li[1] } key={ li[0] } />);
  // }

  render() {
    const { currencies } = this.props;

    return (
      <form className="form-expense">
        { this.renderInput('value', 'valor') }
        { this.renderInput('description', 'descrição') }
        { this.renderSelect('currency', currencies) }
        { this.renderSelect(
          'method',
          ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
        ) }
        { this.renderSelect(
          'tag',
          ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
        ) }
      </form>
    );
  }
}

FormExpense.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
};

// mapeie o estado global para a propriedade da sua aplicação
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(FormExpense);
