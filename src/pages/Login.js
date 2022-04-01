import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login as loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSubmitDisabled: true,
    };

    this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
  }

  // helpers
  // verificar:
  // O email está no formato válido, como 'alguem@alguem.com'.
  // A senha possui 6 ou mais caracteres.
  // Link para /carteira
  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.validate(); });
  }

  onSubmitButtonClick(e) {
    e.preventDefault();
    const { email } = this.state;
    const { history, loginDispatch } = this.props;
    // fazer o dispatch
    loginDispatch(email);
    history.push('/carteira');
  }

  validate = () => {
    const { email, password } = this.state;
    const min = 6;
    let formIsValid = false;
    if (password.length >= min && this.validateEmail(email)) formIsValid = true;
    this.setState({ isSubmitDisabled: !formIsValid });
  }

  validateEmail = (email) => {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
  }

  render() {
    const { email, password, isSubmitDisabled } = this.state;
    // const { login } = this.props;
    return (
      <div className="Login">
        <h3 className="text-center">Login</h3>
        <section className="login-inputs">
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
            // onChange={ (e) => this.setState({ email: e.target.value }) }
            placeholder="E-mail"
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.onInputChange }
            // onChange={ (e) => this.setState({ password: e.target.value }) }
            placeholder="Senha"
          />
        </section>
        <div className="link">
          {/* <Link
            to="/wallet"
            // onClick={ () => login({ email, password }) }
            onClick={ this.onSubmitButtonClick }
            data-testid="btn-login"
            disabled={ isSubmitDisabled }
          >
            Entrar
          </Link> */}
          <button
            type="button"
            data-testid="btn-login"
            disabled={ isSubmitDisabled }
            onClick={ this.onSubmitButtonClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  loginDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (e) => dispatch(loginAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
