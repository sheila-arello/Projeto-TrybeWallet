import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './TableExpense.css';

class TableExpense extends React.Component {
  renderExpenses = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return null;
    return (
      expenses.map((expense) => (
        <tr className="tr-expenses" key={ expense.key }>
          <td>{ expense.description }</td>
          <td>{ expense.tag }</td>
          <td>{ expense.method }</td>
          <td>{ expense.value }</td>
          <td>{ expense.currency }</td>
          <td>{ expense.exchangeRates[expense.currency].ask }</td>
          <td>XXX</td>
          <td>BRL</td>
          <td>Editar/Excluir</td>
        </tr>
      )));
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
  // getCurrencies: PropTypes.func.isRequired,
  // quotation: PropTypes.func.isRequired,
  // saveExpense: PropTypes.func.isRequired,
  // calcTotal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.any,
  ).isRequired,
  // currQuotation: PropTypes.shape(
  //   PropTypes.any,
  // ).isRequired,
  // isQuotationAvailable: PropTypes.bool.isRequired,
  // loading: PropTypes.bool.isRequired,
};

// mapeie o estado global para a propriedade da sua aplicação

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

});

export default connect(mapStateToProps, null)(TableExpense);
