import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { totalExpenses } from '../actions';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <div className="header-container">
        <header data-testid="header-component">
          <div className="header">
            <img src="./" alt="logo" />
            <p>My Finances</p>
            <div className="esquerda">
              <p data-testid="email-field">{ `Email: ${email}` }</p>
              <span>Despesa Total: </span>
              <span data-testid="total-field">
                { (total === undefined) ? 0 : total.toFixed(2) }
              </span>
              {/* <p data-testid="total-field">{ `Despesa Total: ${total} ` }</p> */}
              <p data-testid="header-currency-field">BRL</p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

// mapeie o estado global para a propriedade da sua aplicação
const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
