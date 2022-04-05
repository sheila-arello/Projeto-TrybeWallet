import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies,
  fetchCurrQuotation,
  addExpense,
  setTotal } from '../actions';
import Loading from './Loading';

const alim = 'Alimentação';

class FormExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      currency: 'USD',
      tag: alim,
      method: 'Dinheiro',
      value: '',
      description: '',
      expense: {},
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmitButtonClick = () => {
    const {
      id,
      currency,
      tag,
      method,
      value,
      description,
    } = this.state;
    this.setState({
      expense: {
        id,
        currency,
        tag,
        method,
        value,
        description },
      id: id + 1,
      currency: 'USD',
      tag: alim,
      method: 'Dinheiro',
      value: '',
      description: '',
    }, () => this.setExpenses());
  }

  setExpenses = async () => {
    const { quotation } = this.props;
    await quotation();
    // Dispara action para salvar expense com state local + quotation
    // a mesma action reseta o isQuotationAvailable
    const { currQuotation, saveExpense, calcTotal } = this.props;
    // console.log('nova cotacao: ', currQuotation);
    const { expense } = this.state;
    const objExpense = {
      ...expense,
      exchangeRates: currQuotation,
    };
    saveExpense(objExpense);
    calcTotal();
  }

  // formLoad = () => {
  //   const { both } = this.state;

  //   return both.map((li) => <Input name={ li[0] } placeH={ li[1] } key={ li[0] } />);
  // }

  renderOption = (curr) => <option key={ curr } value={ curr }>{ curr }</option>

  render() {
    const { currencies, loading } = this.props;
    if (loading) return <Loading />;
    const {
      currency,
      tag,
      method,
      value,
      description } = this.state;
    const arrMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const arrTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form className="form-expense">
        <label htmlFor="value">
          Value
          <input
            placeholder="valor"
            data-testid="value-input"
            id="value"
            type="text"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            placeholder="descrição"
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            className="choices"
            id="moeda"
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.onInputChange }
          >
            { currencies.map((curr) => this.renderOption(curr)) }
          </select>
        </label>
        <label htmlFor="method">
          Method
          <select
            className="choices"
            id="method"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
            data-testid="method-input"
          >
            { arrMethod.map((curr) => this.renderOption(curr)) }
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            className="choices"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
            data-testid="tag-input"
          >
            { arrTag.map((curr) => this.renderOption(curr)) }
          </select>
        </label>

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
  ),
  // isQuotationAvailable: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

FormExpense.defaultProps = {
  currQuotation: {},
};

// mapeie o estado global para a propriedade da sua aplicação
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  quotation: () => dispatch(fetchCurrQuotation()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
  calcTotal: () => dispatch(setTotal()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currQuotation: state.wallet.currQuotation,
  isQuotationAvailable: state.wallet.isQuotationAvailable,
  loading: state.wallet.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
