import "./header.css";
import primary_icon from '../../assets/primary_icon.png';;

const Header = () => {
  return (
    <header className="header">
      <img src={primary_icon} alt="" />
      <h1>Form Builder</h1>
    </header>
  )
}

export default Header;