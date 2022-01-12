import './RegisterCard.css'
import Input from '../Input/Input';
import RoundButton from '../RoundButton/RoundButton';

export default function RegisterCard() {
  return (
    <form id="registerCard">
      <Input type="text" placeholder="Full Name"/>
      <Input type="email" placeholder="Your Email" />
      <Input type="text" placeholder="Phone Number"/>
      <Input type="password" placeholder="Password"/>
      <Input type="password" placeholder="Repeat Password"/>
      <div className="signup-line">
        <p className="bold">Sign Up</p>
        <RoundButton/>
      </div>
    </form>
  );
}
