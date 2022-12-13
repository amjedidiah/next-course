import styles from "../styles/navbar.module.scss";

type NavbarProps = {
  username: string;
};

export default function Navbar({ username }: NavbarProps) {
  return (
    <div>
      Navbar
      <p>{username}</p>
      <ul>
        <li>Home</li>
        <li>My List</li>
      </ul>
      <nav>
        <div>
          <button type="button">
            <p>{username}</p>
          </button>

          <div>
            <button type="button">Sign Out</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
