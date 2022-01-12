import './LoginCard.css';
import Input from '../Input/Input';
import RoundButton from '../RoundButton/RoundButton';

export default function LoginCard() {
  return (
    <form id="loginCard">
      <Input type="email" placeholder="Your Email" />
      <Input type="password" placeholder="Password"/>
      <div id="formControl">
        <div className="signup-line">
          <p className="bold">Sign In</p>
          <RoundButton/>
        </div>
        <div className="signin-line">
          <p className="bold">Sign Up</p>
        </div>
      </div>
    </form>
  );
}
