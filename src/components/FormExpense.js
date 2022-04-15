import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies,
  fetchCurrQuotation,
  addExpense,
  setTotal,
  setCurrentId,
  resetEditMode,
  uptExpense } from '../actions';
import Loading from './Loading';

const INITIAL_STATE_FORM = {
  currency: 'USD',
  tag: 'Alimentação',
  method: 'Dinheiro',
  value: '',
  description: '',
};

class FormExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.currentId,
      expense: {},
      isEditing: false,
      exchangeRates: '',
      ...INITIAL_STATE_FORM,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { editId, expenses, isEditingGlobal, rstGlobalMode } = this.props;
    if (prevProps.isEditingGlobal === isEditingGlobal) return null;
    const editExpense = expenses.filter((expense) => expense.id === editId)[0];
    this.setState({
      id: editId,
      currency: editExpense.currency,
      tag: editExpense.tag,
      method: editExpense.method,
      value: editExpense.value,
      description: editExpense.description,
      isEditing: true,
      exchangeRates: editExpense.exchangeRates,
    });
    rstGlobalMode();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  onSubmitButtonClick = () => {
    const { id, currency, tag, method, value, description } = this.state;
    this.setState({
      expense: { id, currency, tag, method, value, description },
      id: id + 1,
      ...INITIAL_STATE_FORM,
    }, () => this.setExpenses());
  }

  onEditButtonClick = () => {
    const { id, currency, tag, method, value, description, exchangeRates } = this.state;
    const edtExpense = { id, currency, tag, method, value, description, exchangeRates };
    const { editId, expenses } = this.props;
    const filterEdited = expenses.filter((expense) => expense.id !== editId);
    const newExpenses = [
      ...filterEdited,
      edtExpense,
    ];
    this.setState({
      isEditing: false,
      id: newExpenses.length,
      exchangeRates: '',
      ...INITIAL_STATE_FORM,
    }, () => this.setEditExpense(newExpenses));
  }

  setEditExpense = (objExpense) => {
    const { updateExpense, calcTotal, setCurrId } = this.props;
    updateExpense(objExpense);
    setCurrId(objExpense.length);
    calcTotal();
  }

  setExpenses = async () => {
    const { quotation } = this.props;
    await quotation();
    const { currQuotation, saveExpense, calcTotal, setCurrId } = this.props;
    const { expense, id } = this.state;
    const objExpense = { ...expense, exchangeRates: currQuotation };
    saveExpense(objExpense);
    setCurrId(id);
    calcTotal();
  }

  renderOption = (curr) => <option key={ curr } value={ curr }>{ curr }</option>

  render() {
    const { currencies, loading } = this.props;
    if (loading) return <Loading />;
    const { currency, tag, method, value, description, isEditing } = this.state;
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
        { (isEditing)
          ? (
            <button
              type="button"
              data-testid="btn-edit"
              onClick={ this.onEditButtonClick }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="button"
              data-testid="btn-add"
              onClick={ this.onSubmitButtonClick }
            >
              Adicionar despesa
            </button>
          ) }
      </form>
    );
  }
}

FormExpense.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  quotation: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  updateExpense: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
  setCurrId: PropTypes.func.isRequired,
  rstGlobalMode: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.any).isRequired,
  currQuotation: PropTypes.shape(PropTypes.any),
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  isEditingGlobal: PropTypes.bool.isRequired,
  editId: PropTypes.number.isRequired,
  currentId: PropTypes.number.isRequired,
};

FormExpense.defaultProps = {
  currQuotation: {},
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  quotation: () => dispatch(fetchCurrQuotation()),
  saveExpense: (expense) => dispatch(addExpense(expense)),
  setCurrId: (id) => dispatch(setCurrentId(id)),
  updateExpense: (expenses) => dispatch(uptExpense(expenses)),
  calcTotal: () => dispatch(setTotal()),
  rstGlobalMode: () => dispatch(resetEditMode()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  currQuotation: state.wallet.currQuotation,
  isQuotationAvailable: state.wallet.isQuotationAvailable,
  loading: state.wallet.isLoading,
  isEditingGlobal: state.edit.isEditingMode,
  editId: state.edit.editId,
  currentId: state.edit.currentId,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
