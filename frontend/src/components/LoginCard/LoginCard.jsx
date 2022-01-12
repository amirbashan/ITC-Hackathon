import './LoginCard.css';
import Input from '../Input/Input';

export default function LoginCard() {
  return (
    <form id="loginCard">
      Login Card
      <Input type="text" placeholder="Full Name"/>
      <Input type="email" placeholder="Your Email" />
      <Input type="text" placeholder="Phone Number"/>
      <Input type="password" placeholder="Password"/>
      <Input type="password" placeholder="Repeat Password"/>
    </form>
  );
}
