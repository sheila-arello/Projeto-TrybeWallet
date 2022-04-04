import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAllExpenses, setTotal } from '../actions';
import './TableExpense.css';

class TableExpense extends React.Component {
  handleDelete = (id) => {
    // excluir expense do estado global
    // const deleteElem = parseInt(target.parentElement.parentElement.id, 10);
    // console.log(typeof deleteElem);
    const { expenses, saveExpenses, calcTotal } = this.props;
    // if (expenses.length === 1) return [];
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    // console.log(newExpenses);
    saveExpenses(newExpenses);
    calcTotal();
  }

  renderExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
    return (
      expenses.map((expense) => {
        const moeda = expense.exchangeRates[expense.currency];
        // const rate = Math.round(parseFloat(moeda.ask).toFixed(2));
        const rate = parseFloat(moeda.ask).toFixed(2);
        const moedaName = moeda.name.split('/')[0];
        const conversão = 'Real'; // moeda.name.split('/')[1];
        const vlrConverted = parseFloat(expense.value) * parseFloat(moeda.ask); // parseFloat(moeda.ask);
        return (
          <tr className="tr-expenses" id={ expense.id } key={ expense.id }>
            <td role="cell">{ expense.description }</td>
            <td role="cell">{ expense.tag }</td>
            <td role="cell">{ expense.method }</td>
            <td role="cell">{ parseFloat(expense.value).toFixed(2) }</td>
            <td role="cell">{ moedaName }</td>
            <td role="cell">{ rate }</td>
            <td role="cell">{ vlrConverted.toFixed(2) }</td>
            <td role="cell">{ conversão }</td>
            <td role="cell">
              <button
                type="button"
                data-testid="edit-btn"
              >
                Editar
              </button>
              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => this.handleDelete(expense.id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        );
      }));
  }

  renderThead = () => {
    const header = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <tr role="row">
        { header.map((text) => (
          <th
            role="columnheader"
            scope="col"
            key={ text }
          >
            {text}
          </th>
        ))}
      </tr>
    );
  }

  render() {
    return (
      <div className="table-expenses">
        <table>
          <thead className="table-header">
            { this.renderThead() }
          </thead>
          <tbody>
            { this.renderExpenses() }
          </tbody>
        </table>
      </div>
    );
  }
}

TableExpense.propTypes = {
  saveExpenses: PropTypes.func.isRequired,
  calcTotal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(setAllExpenses(expenses)),
  calcTotal: () => dispatch(setTotal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableExpense);
