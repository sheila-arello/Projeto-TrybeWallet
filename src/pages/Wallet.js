import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { fetchCurrencies } from '../actions';
import FormExpense from '../components/FormExpense';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
    // console.log(getCurrencies());
  }

  render() {
    const { loading } = this.props;
    // console.log(currencies);
    return (
      <div>
        <Header />
        { loading ? <Loading /> : <FormExpense /> }
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // currencies: PropTypes.arrayOf(
  //   PropTypes.any,
  // ).isRequired,
};

// mapeie o estado global para a propriedade da sua aplicação
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  loading: state.wallet.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
