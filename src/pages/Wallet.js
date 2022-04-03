import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
import FormExpense from '../components/FormExpense';
import TableExpense from '../components/TableExpense';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {/* { loading ? <Loading /> : <FormExpense /> } */}
        <FormExpense />
        <TableExpense />
      </div>
    );
  }
}

// Wallet.propTypes = {
//   getCurrencies: PropTypes.func.isRequired,
//   loading: PropTypes.bool.isRequired,
//   // currencies: PropTypes.arrayOf(
//   //   PropTypes.any,
//   // ).isRequired,
// };

// // mapeie o estado global para a propriedade da sua aplicação
// const mapDispatchToProps = (dispatch) => ({
//   getCurrencies: () => dispatch(fetchCurrencies()),
// });

// const mapStateToProps = (state) => ({
//   currencies: state.wallet.currencies,
//   loading: state.wallet.isLoading,
//   isQuotationAvailable: state.wallet.isQuotationAvailable,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
export default Wallet;
