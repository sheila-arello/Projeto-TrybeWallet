import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TableExpense.css';

class TableExpense extends React.Component {
  renderExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
    return (
      expenses.map((expense) => {
        const moeda = expense.exchangeRates[expense.currency];
        // const rate = Math.round(parseFloat(moeda.ask).toFixed(2));
        const rate = parseFloat(moeda.ask).toFixed(2);
        console.log(rate);
        const moedaName = moeda.name.split('/')[0];
        const conversão = 'Real'; // moeda.name.split('/')[1];
        const vlrConverted = parseFloat(expense.value) * parseFloat(moeda.ask); // parseFloat(moeda.ask);
        return (
          <tr className="tr-expenses" key={ expense.key }>
            <td role="cell">{ expense.description }</td>
            <td role="cell">{ expense.tag }</td>
            <td role="cell">{ expense.method }</td>
            <td role="cell">{ parseFloat(expense.value).toFixed(2) }</td>
            <td role="cell">{ moedaName }</td>
            <td role="cell">{ rate }</td>
            <td role="cell">{ vlrConverted.toFixed(2) }</td>
            <td role="cell">{ conversão }</td>
            <td role="cell">Editar/Excluir</td>
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
  expenses: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

});

export default connect(mapStateToProps, null)(TableExpense);
