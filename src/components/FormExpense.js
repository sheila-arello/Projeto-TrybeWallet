import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies,
  fetchCurrQuotation,
  setExpenses,
  setTotal } from '../actions';
import Loading from './Loading';

class FormExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'USD',
      tag: 'Alimentação',
      method: 'Dinheiro',
      value: '',
      description: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
    // console.log(getCurrencies());
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmitButtonClick = (e) => {
    e.preventDefault();
    const { quotation } = this.props;
    quotation();
  }

  updateSelect = () => {
    const selects = document.querySelectorAll('.choices');
    if (selects.length === 0) return null;
    const currency = selects[0].value;
    const method = selects[1].value;
    const tag = selects[2].value;
    this.setState({
      currency,
      method,
      tag,
    });
  }

  setExpenses = () => {
    // incrementar o id no state global (no redux)
    // adicionar á expense o exchangeRates
    // calcular o total para atualizar o cabeçalho
    const { currQuotation,
      isQuotationAvailable,
      saveExpense,
      calcTotal } = this.props;
    if (isQuotationAvailable) {
      // Dispara action para salvar expense com state local + quotation
      // a mesma action reseta o isQuotationAvailable
      this.updateSelect();
      const objExpense = {
        ...this.state,
        exchangeRates: currQuotation,
      };
      console.log('Agora sim dispara as açoes');
      saveExpense(objExpense);
      calcTotal();
    }
  }

  renderInput = (name, placeHolder) => (
    <label htmlFor={ name }>
      { `${name}:` }
      <input
        placeholder={ placeHolder }
        data-testid={ `${name}-input` }
        id={ name }
        type="text"
        name={ name }
        // value={ name }
        onChange={ this.onInputChange }
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
        onChange={ this.onInputChange }
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
    const { currencies, loading } = this.props;
    // this.setExpenses();
    if (loading) return <Loading />;
    this.setExpenses();
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
        <button
          type="button"
          data-testid="btn-login"
          onClick={ this.onSubmitButtonClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormExpense.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  quotation: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
  currQuotation: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
  isQuotationAvailable: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

// mapeie o estado global para a propriedade da sua aplicação
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  quotation: () => dispatch(fetchCurrQuotation()),
  saveExpense: (expense) => dispatch(setExpenses(expense)),
  calcTotal: () => dispatch(setTotal()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currQuotation: state.wallet.currQuotation,
  isQuotationAvailable: state.wallet.isQuotationAvailable,
  loading: state.wallet.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
